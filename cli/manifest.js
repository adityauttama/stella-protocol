// Stella Protocol by Aditya Uttama
// https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama

// Single owner of distribution facts. install.js, init.js and scripts/sync.js
// read from here so the skill list, brain templates and session hook cannot
// drift apart again. Uses only Node built-ins so scripts/sync.js needs no deps.

const path = require('path');
const fs = require('fs');

const PACKAGE_DIR = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(PACKAGE_DIR, 'skills');
const TEMPLATES_DIR = path.join(PACKAGE_DIR, 'punk-records');
const HOOK_TEMPLATE = path.join(TEMPLATES_DIR, 'stella-claude-md.md');
const HOOK_MARKER = '## Stella Protocol';

// Files copied into a project's brain/ by `stella init` and `stella install`.
const BRAIN_TEMPLATES = [
  'log-pose.md',
  'project-context.md',
  'architecture.md',
  'vivre-cards.md',
  'ideas.md',
  'scope-changes.md',
  'design-system.md',
];

// Every folder under skills/ that contains a SKILL.md ships to users.
function listSkills(skillsDir = SKILLS_DIR) {
  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(skillsDir, entry.name, 'SKILL.md')))
    .map((entry) => entry.name)
    .sort();
}

function fillPlaceholders(template, content, projectName, today) {
  if (template === 'log-pose.md') {
    return content.replace('{project-name}', projectName).replace('YYYY-MM-DD', today);
  }
  if (template === 'project-context.md') {
    return content.replace('{project-name}', projectName);
  }
  return content;
}

// Copies brain templates into brainTarget. Existing files are never overwritten.
// Returns the list of files written.
function writeBrainTemplates(brainTarget, projectName, today = new Date().toISOString().split('T')[0]) {
  fs.mkdirSync(brainTarget, { recursive: true });
  const written = [];
  for (const template of BRAIN_TEMPLATES) {
    const dest = path.join(brainTarget, template);
    if (fs.existsSync(dest)) continue;
    const content = fs.readFileSync(path.join(TEMPLATES_DIR, template), 'utf-8');
    fs.writeFileSync(dest, fillPlaceholders(template, content, projectName, today));
    written.push(template);
  }
  return written;
}

// The part of punk-records/stella-claude-md.md that goes into a project's CLAUDE.md:
// everything from the first "## Stella Protocol" heading to the end of the file.
function readHookSection(templatePath = HOOK_TEMPLATE) {
  const content = fs.readFileSync(templatePath, 'utf-8');
  const start = content.indexOf(HOOK_MARKER);
  if (start === -1) {
    throw new Error(`${path.relative(PACKAGE_DIR, templatePath)} has no "${HOOK_MARKER}" heading`);
  }
  return content.slice(start);
}

module.exports = {
  PACKAGE_DIR,
  SKILLS_DIR,
  TEMPLATES_DIR,
  HOOK_TEMPLATE,
  BRAIN_TEMPLATES,
  listSkills,
  writeBrainTemplates,
  readHookSection,
};
