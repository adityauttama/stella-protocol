#!/usr/bin/env node
// Stella Protocol by Aditya Uttama
// https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama

// Regenerates every hand-copied distribution artifact from its single source:
//   skills/                          -> .claude/skills/ (dogfooding mirror)
//   skills/ + package.json version   -> .claude-plugin/marketplace.json
//   punk-records/stella-claude-md.md -> CLAUDE.md
// and lints skill files.
//
//   node scripts/sync.js          write generated files
//   node scripts/sync.js --check  fail (exit 1) if anything drifted; writes nothing

const path = require('path');
const fs = require('fs');
const {
  PACKAGE_DIR: ROOT,
  SKILLS_DIR,
  TEMPLATES_DIR,
  BRAIN_TEMPLATES,
  listSkills,
  readHookSection,
} = require('../cli/manifest');

const args = process.argv.slice(2);
for (const arg of args) {
  if (arg !== '--check') {
    console.error(`Unknown option: ${arg}`);
    process.exit(2);
  }
}
const check = args.includes('--check');

const MIRROR_DIR = path.join(ROOT, '.claude', 'skills');
const MARKETPLACE = path.join(ROOT, '.claude-plugin', 'marketplace.json');
const CLAUDE_MD = path.join(ROOT, 'CLAUDE.md');
const DESCRIPTION_LIMIT = 250;

const issues = [];
const rel = (p) => path.relative(ROOT, p);

function listFiles(dir, prefix = '') {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listFiles(path.join(dir, entry.name), relative));
    else if (entry.isFile()) out.push(relative);
  }
  return out;
}

// Write `expected` to `file`, or in check mode record drift.
function ensureFile(file, expected) {
  const actual = fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : null;
  if (actual === expected) return;
  if (check) {
    issues.push(`${rel(file)} is out of date`);
    return;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, expected);
  console.log(`wrote ${rel(file)}`);
}

// --- 1. Skill lint --------------------------------------------------------

function lintSkill(skill) {
  const skillDir = path.join(SKILLS_DIR, skill);
  const skillMd = fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf-8');
  const frontmatter = skillMd.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    issues.push(`skills/${skill}/SKILL.md: missing YAML frontmatter at top of file`);
  } else {
    const name = frontmatter[1].match(/^name:\s*(.+)$/m);
    const description = frontmatter[1].match(/^description:\s*(.+)$/m);
    if (!name || name[1].trim() !== skill) {
      issues.push(`skills/${skill}/SKILL.md: frontmatter name must be "${skill}"`);
    }
    if (!description) {
      issues.push(`skills/${skill}/SKILL.md: missing single-line description`);
    } else if (description[1].trim().length > DESCRIPTION_LIMIT) {
      issues.push(`skills/${skill}/SKILL.md: description is ${description[1].trim().length} chars (limit ${DESCRIPTION_LIMIT})`);
    }
  }

  // Relative links must stay inside the skill folder: only the folder is installed.
  for (const file of listFiles(skillDir).filter((f) => f.endsWith('.md'))) {
    const content = fs.readFileSync(path.join(skillDir, file), 'utf-8');
    for (const match of content.matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)) {
      const target = match[1];
      if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)) continue;
      const resolved = path.resolve(path.dirname(path.join(skillDir, file)), target.split('#')[0]);
      const inside = path.relative(skillDir, resolved);
      if (inside.startsWith('..') || path.isAbsolute(inside)) {
        issues.push(`skills/${skill}/${file}: link escapes the installed skill folder: ${target}`);
      } else if (!fs.existsSync(resolved)) {
        issues.push(`skills/${skill}/${file}: broken link: ${target}`);
      }
    }
  }
}

const skills = listSkills();
if (skills.length === 0) issues.push('skills/: no skill folders with SKILL.md found');
skills.forEach(lintSkill);

for (const template of BRAIN_TEMPLATES) {
  if (!fs.existsSync(path.join(TEMPLATES_DIR, template))) {
    issues.push(`punk-records/${template}: brain template listed in cli/manifest.js is missing`);
  }
}

// --- 2. Dogfooding mirror: skills/ -> .claude/skills/ ----------------------

const expectedMirror = new Set();
for (const skill of skills) {
  for (const file of listFiles(path.join(SKILLS_DIR, skill))) {
    const relative = `${skill}/${file}`;
    expectedMirror.add(relative);
    ensureFile(path.join(MIRROR_DIR, relative), fs.readFileSync(path.join(SKILLS_DIR, relative), 'utf-8'));
  }
}
for (const relative of listFiles(MIRROR_DIR)) {
  if (expectedMirror.has(relative)) continue;
  if (check) {
    issues.push(`.claude/skills/${relative} has no source in skills/`);
  } else {
    fs.rmSync(path.join(MIRROR_DIR, relative));
    console.log(`removed .claude/skills/${relative}`);
  }
}
if (!check) {
  // Drop directories left empty by removals.
  for (const entry of fs.existsSync(MIRROR_DIR) ? fs.readdirSync(MIRROR_DIR) : []) {
    const dir = path.join(MIRROR_DIR, entry);
    if (fs.statSync(dir).isDirectory() && listFiles(dir).length === 0) fs.rmSync(dir, { recursive: true });
  }
}

// --- 3. Plugin marketplace: version + skill list ---------------------------

const { version } = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
const marketplace = JSON.parse(fs.readFileSync(MARKETPLACE, 'utf-8'));
const plugin = (marketplace.plugins || []).find((p) => p.name === 'stella-protocol');
if (!plugin) {
  issues.push(`${rel(MARKETPLACE)}: no plugin named "stella-protocol"`);
} else {
  plugin.version = version;
  plugin.skills = skills.map((skill) => `./skills/${skill}`);
  ensureFile(MARKETPLACE, JSON.stringify(marketplace, null, 2) + '\n');
}

// --- 4. CLAUDE.md session hook ---------------------------------------------

ensureFile(CLAUDE_MD, readHookSection());

// --- Report ----------------------------------------------------------------

if (issues.length > 0) {
  console.error(`sync${check ? ' --check' : ''} found ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`  - ${issue}`);
  if (check) console.error('Run `npm run sync` to regenerate, then fix any remaining lint issues by hand.');
  process.exit(1);
}
console.log(`sync${check ? ' --check' : ''}: OK — ${skills.length} skills, mirror, marketplace (v${version}) and CLAUDE.md in sync`);
