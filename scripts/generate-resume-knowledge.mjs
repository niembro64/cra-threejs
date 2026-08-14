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

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  `${lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`,
  'utf8'
);
process.stdout.write(`Generated ${outputPath}\n`);
