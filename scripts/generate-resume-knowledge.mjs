import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const sourcePath = path.join(projectRoot, 'src', 'data', 'myData.ts');
const outputPath = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(projectRoot, 'knowledge', 'niemo-io-resume.md');

const renderMarkdown = (documentLines) =>
  `${documentLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`;

const writeMarkdown = (filePath, documentLines) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, renderMarkdown(documentLines), 'utf8');
};

const source = fs.readFileSync(sourcePath, 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
  },
  fileName: sourcePath,
}).outputText;

const module = { exports: {} };
const context = {
  module,
  exports: module.exports,
  process: { env: { PUBLIC_URL: '' } },
  require: (specifier) => {
    throw new Error(`The résumé data export unexpectedly required ${specifier}`);
  },
};
vm.runInNewContext(transpiled, context, { filename: sourcePath });

const data = module.exports;
const lines = [
  '# Eric Niemeyer — Public Résumé Knowledge',
  '',
  '> Canonical source: the public data used by niemo.io. This document contains public résumé facts only.',
  '',
  '## Profile',
  '',
  data.EricResumeDescription,
  '',
  data.myDataShort,
  '',
  '## Work Experience',
  '',
];

for (const job of data.jobs) {
  lines.push(`### ${job.company} — ${job.title}`, '', `- Location: ${job.location}`, `- Dates: ${job.dates}`);
  for (const detail of job.details) {
    lines.push(`- ${detail.title}`);
    for (const item of detail.lines) lines.push(`  - ${item}`);
  }
  lines.push('');
}

lines.push('## Education', '');
for (const education of data.educations) {
  lines.push(`### ${education.degree} — ${education.school}`, '', `- Date: ${education.dates}`);
  for (const detail of education.details) {
    lines.push(`- ${detail.title}`);
    for (const item of detail.lines) lines.push(`  - ${item}`);
  }
  lines.push('');
}

lines.push('## Skills', '');
for (const category of data.skills) {
  lines.push(`### ${category.title}`, '');
  if (category.dates) lines.push(`- Experience range: ${category.dates}`);
  for (const skill of category.skills) lines.push(`- ${skill.title}: ${skill.details.join(', ')}`);
  lines.push('');
}

const projectGroups = [
  ['Machine Learning', data.ai_projects],
  ['Computer Science', data.compsci_projects],
  ['Video Games', data.videogame_projects],
  ['Full-Stack Web', data.fullstack_projects],
  ['Art and Audio', data.art_projects],
];

lines.push('## Projects', '');
for (const [groupName, projects] of projectGroups) {
  lines.push(`### ${groupName}`, '');
  for (const project of projects.filter((item) => item.projectStatus === 'ok')) {
    lines.push(`#### ${project.title}`, '');
    if (project.type) lines.push(`- Type: ${project.type}`);
    if (project.dates) lines.push(`- Dates: ${project.dates}`);
    if (project.description) lines.push(`- Description: ${project.description}`);
    if (project.stack?.length) lines.push(`- Technology: ${project.stack.join(', ')}`);
    if (project.bullets?.length) lines.push(`- Features: ${project.bullets.join('; ')}`);
    if (project.url) lines.push(`- Public URL: ${project.url}`);
    lines.push('');
  }
}

lines.push('## Public Profiles', '');
for (const profile of data.socialMedia) lines.push(`- ${profile.platform}: ${profile.url}`);
lines.push('');

writeMarkdown(outputPath, lines);

const profileDirectory = path.join(path.dirname(outputPath), 'data', 'profile');

const workLines = [
  '# Eric Niemeyer — Work Experience',
  '',
  '> Canonical source: the public work-experience section of niemo.io.',
  '',
  'This document contains Eric Niemeyer’s complete public niemo.io work-experience section.',
  '',
];
for (const job of data.jobs) {
  workLines.push(
    `## Work experience: ${job.company} — ${job.title}`,
    '',
    `- Company: ${job.company}`,
    `- Role: ${job.title}`,
    `- Location: ${job.location}`,
    `- Dates: ${job.dates}`
  );
  for (const detail of job.details) {
    workLines.push(`- Responsibility: ${detail.title}`);
    for (const item of detail.lines) workLines.push(`  - Technology, client, or detail: ${item}`);
  }
  workLines.push('');
}

const educationLines = [
  '# Eric Niemeyer — Education',
  '',
  '> Canonical source: the public education section of niemo.io.',
  '',
  'This document contains Eric Niemeyer’s complete public education, degrees, honors, certifications, and coursework.',
  '',
];
for (const education of data.educations) {
  educationLines.push(
    `## Education: ${education.degree} — ${education.school}`,
    '',
    `- Degree or program: ${education.degree}`,
    `- School: ${education.school}`,
    `- Completion year: ${education.dates}`
  );
  for (const detail of education.details) {
    educationLines.push(`- Education detail: ${detail.title}`);
    for (const item of detail.lines) educationLines.push(`  - Coursework, honor, or credential: ${item}`);
  }
  educationLines.push('');
}

const skillLines = [
  '# Eric Niemeyer — Skills',
  '',
  '> Canonical source: the public skills section of niemo.io.',
  '',
  'This document contains Eric Niemeyer’s complete public technical, language, artistic, and platform skills.',
  '',
];
for (const category of data.skills) {
  const categoryLabel =
    category.title === 'AI & ML'
      ? 'AI & ML — Artificial Intelligence, Machine Learning, and Neural Networks'
      : category.title;
  skillLines.push(`## Skills: ${categoryLabel}`, '');
  if (category.dates) skillLines.push(`- Experience range: ${category.dates}`);
  for (const skill of category.skills) skillLines.push(`- ${skill.title}: ${skill.details.join(', ')}`);
  skillLines.push('');
}

const workspaceLines = [
  '# Eric Niemeyer — Workspaces and Equipment',
  '',
  '> Canonical source: the public work-environments section of niemo.io.',
  '',
  'This document describes Eric Niemeyer’s home workstation, desks, home lab, development devices, and AI-training equipment.',
  '',
];
for (const environment of data.workEnvironments) {
  workspaceLines.push(`## Workspace: ${environment.title}`, '');
  if (environment.title === 'AI Development') {
    workspaceLines.push(
      'Eric uses this local AI-development workstation for neural-network training and engineering experiments.',
      ''
    );
  }
  for (const detail of environment.description) workspaceLines.push(`- Workspace equipment or feature: ${detail}`);
  workspaceLines.push('');
}

const renderTrivia = (content) =>
  content
    .map((segment) => (segment.type === 'link' ? `[${segment.text}](${segment.url})` : segment.text))
    .join('')
    .trim();

const triviaLines = [
  '# Eric Niemeyer — Trivia and Personal Interests',
  '',
  '> Canonical source: the public trivia section of niemo.io.',
  '',
  'This document contains unusual facts, personal interests, music history, sports leadership, and hobbies associated with Eric Niemeyer.',
  '',
];
for (const item of data.triviaItems) {
  triviaLines.push(`## Trivia: ${item.title}`, '', renderTrivia(item.content), '');
}

const generatedDocuments = [
  [path.join(profileDirectory, 'work-experience.md'), workLines],
  [path.join(profileDirectory, 'education.md'), educationLines],
  [path.join(profileDirectory, 'skills.md'), skillLines],
  [path.join(profileDirectory, 'workspaces-and-equipment.md'), workspaceLines],
  [path.join(profileDirectory, 'trivia-and-interests.md'), triviaLines],
];

for (const [filePath, documentLines] of generatedDocuments) writeMarkdown(filePath, documentLines);

process.stdout.write(`Generated ${outputPath}\n`);
for (const [filePath] of generatedDocuments) process.stdout.write(`Generated ${filePath}\n`);
