import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const knowledgeRoot = path.join(repositoryRoot, 'knowledge');
const manifestPath = path.join(knowledgeRoot, 'index-manifest.json');
const targetCharacters = 1600;
const requiredCategories = ['work', 'skills', 'engineering', 'programming', 'hobbies', 'projects'];
const forbiddenPathPatterns = [
  /transcript/i,
  /source-pdfs/i,
  /resume\/.*\.(?:pdf|txt)$/i,
  /frontend\/source-files/i,
  /notes?/i,
  /movingexpenses/i,
  /interview/i,
];
const fillerPatterns = [
  /\bmm-?hmm\b/i,
  /\byou (?:do not|don't|don’t) have to respond\b/i,
  /\buh(?:h+)?\b/i,
];

function fail(message) {
  throw new Error(`RAG corpus validation failed: ${message}`);
}

function normalizeText(value) {
  return value
    .normalize('NFKC')
    .replaceAll('\r\n', '\n')
    .replaceAll('\r', '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sections(markdown) {
  const result = [];
  const headingStack = [];
  let currentLines = [];

  const flush = () => {
    const content = normalizeText(currentLines.join('\n'));
    if (content) result.push({ heading: headingStack.join(' > '), content });
  };

  for (const line of markdown.split('\n')) {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!match) {
      currentLines.push(line);
      continue;
    }
    flush();
    const level = match[1].length;
    headingStack.length = Math.min(headingStack.length, level - 1);
    headingStack[level - 1] = match[2].trim();
    currentLines = [];
  }
  flush();
  return result.length ? result : [{ heading: '', content: markdown }];
}

function chunkEnd(content, start, hardEnd) {
  if (hardEnd >= content.length) return content.length;
  const minimumEnd = start + Math.max(1, Math.floor(targetCharacters * 0.6));
  const window = content.slice(minimumEnd, hardEnd);
  const patterns = [/\n\s*\n/g, /(?<=[.!?])\s+/g, /\s+/g];
  for (const pattern of patterns) {
    let match;
    let lastEnd = 0;
    while ((match = pattern.exec(window))) lastEnd = match.index + match[0].length;
    if (lastEnd) return minimumEnd + lastEnd;
  }
  return hardEnd;
}

function chunks(markdown, documentPath) {
  const result = [];
  for (const section of sections(markdown)) {
    let start = 0;
    while (start < section.content.length) {
      const hardEnd = Math.min(section.content.length, start + targetCharacters);
      const end = chunkEnd(section.content, start, hardEnd);
      const content = section.content.slice(start, end).trim();
      if (content) result.push({ documentPath, heading: section.heading, content });
      if (end >= section.content.length) break;
      start = end;
    }
  }
  return result;
}

if (!fs.existsSync(manifestPath)) fail('knowledge/index-manifest.json is missing');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (manifest.version !== 1 || !Array.isArray(manifest.documents)) {
  fail('manifest must use version 1 and contain a documents array');
}

const seenPaths = new Set();
const selectedChunks = [];
const categoryCounts = Object.fromEntries(requiredCategories.map((category) => [category, 0]));
for (const document of manifest.documents) {
  if (!document || typeof document.path !== 'string') fail('every document requires a path');
  if (seenPaths.has(document.path)) fail(`duplicate manifest path: ${document.path}`);
  seenPaths.add(document.path);
  if (forbiddenPathPatterns.some((pattern) => pattern.test(document.path))) {
    fail(`raw or private source selected for indexing: ${document.path}`);
  }
  if (!Array.isArray(document.labels) || !document.labels.length) {
    fail(`labels are required for ${document.path}`);
  }
  if (typeof document.context !== 'string' || document.context.trim().length < 40) {
    fail(`a meaningful embedding context is required for ${document.path}`);
  }

  const absolutePath = path.resolve(knowledgeRoot, document.path);
  if (!absolutePath.startsWith(`${knowledgeRoot}${path.sep}`) || !fs.existsSync(absolutePath)) {
    fail(`missing or unsafe document path: ${document.path}`);
  }
  const content = fs.readFileSync(absolutePath, 'utf8');
  if (normalizeText(content).length < 200) fail(`document is too small: ${document.path}`);
  for (const pattern of fillerPatterns) {
    if (pattern.test(content)) fail(`transcript filler found in ${document.path}: ${pattern}`);
  }
  for (const category of requiredCategories) {
    if (document.labels.map((label) => label.toLowerCase()).includes(category)) {
      categoryCounts[category] += 1;
    }
  }
  selectedChunks.push(...chunks(content, document.path));
}

for (const [category, count] of Object.entries(categoryCounts)) {
  if (!count) fail(`no manifest documents carry the high-level category '${category}'`);
}

const exactChunkOwners = new Map();
for (const chunk of selectedChunks) {
  if (chunk.content.length > targetCharacters) {
    fail(`oversized chunk in ${chunk.documentPath}: ${chunk.content.length} characters`);
  }
  const normalized = chunk.content.toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').trim();
  const previous = exactChunkOwners.get(normalized);
  if (previous) fail(`duplicate chunks in ${previous} and ${chunk.documentPath}`);
  exactChunkOwners.set(normalized, chunk.documentPath);
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

const allKnowledgeFiles = listFiles(knowledgeRoot)
  .map((entry) => path.relative(knowledgeRoot, entry))
  .filter((entry) => entry !== 'index-manifest.json');

const smallestChunks = selectedChunks.filter((chunk) => chunk.content.length < 120).length;
console.log(`Validated ${manifest.documents.length} canonical documents and ${selectedChunks.length} orthogonal chunks.`);
console.log(`Excluded ${allKnowledgeFiles.length - manifest.documents.length} source/reference files from indexing.`);
console.log(`High-level label coverage: ${JSON.stringify(categoryCounts)}`);
console.log(`Chunks under 120 characters (kept only when semantically complete): ${smallestChunks}`);
for (const chunk of selectedChunks.filter((item) => item.content.length < 120)) {
  console.log(`  - ${chunk.documentPath} :: ${chunk.heading} (${chunk.content.length} characters)`);
}
