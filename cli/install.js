// Stella Protocol by Aditya Uttama
// https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama

const path = require('path');
const fs = require('fs-extra');
const { intro, outro, select, confirm, spinner, note } = require('@clack/prompts');
const chalk = require('chalk');
const { SKILLS_DIR, listSkills, writeBrainTemplates, readHookSection } = require('./manifest');

function detectAITool() {
  const cwd = process.cwd();
  const home = process.env.HOME || process.env.USERPROFILE;

  // Check for Claude Code
  if (fs.existsSync(path.join(cwd, '.claude')) || fs.existsSync(path.join(home, '.claude'))) {
    return 'claude';
  }

  // Check for Cursor
  if (fs.existsSync(path.join(cwd, '.cursor')) || fs.existsSync(path.join(home, '.cursor'))) {
    return 'cursor';
  }

  return null;
}

function getSkillsDir(tool, scope) {
  const home = process.env.HOME || process.env.USERPROFILE;
  const cwd = process.cwd();

  if (tool === 'claude') {
    return scope === 'project'
      ? path.join(cwd, '.claude', 'skills')
      : path.join(home, '.claude', 'skills');
  }

  if (tool === 'cursor') {
    return scope === 'project'
      ? path.join(cwd, '.cursor', 'skills')
      : path.join(home, '.cursor', 'skills');
  }

  // Generic fallback
  return path.join(cwd, '.ai-skills');
}

// Copies every shipped skill folder (including any references/) into skillsTarget.
// Returns the names of the skills installed.
async function installSkills(skillsTarget) {
  const skills = listSkills();
  await fs.ensureDir(skillsTarget);
  for (const skill of skills) {
    await fs.copy(path.join(SKILLS_DIR, skill), path.join(skillsTarget, skill), { overwrite: true });
  }
  return skills;
}

// Appends the Stella session hook to projectDir/CLAUDE.md unless one is already there.
// Returns 'created' | 'appended' | 'skipped'.
async function addSessionHook(projectDir) {
  const hook = readHookSection();
  const claudeMdPath = path.join(projectDir, 'CLAUDE.md');

  if (!fs.existsSync(claudeMdPath)) {
    await fs.writeFile(claudeMdPath, hook);
    return 'created';
  }

  const existing = await fs.readFile(claudeMdPath, 'utf-8');
  if (existing.includes('Stella Protocol')) {
    return 'skipped';
  }
  await fs.appendFile(claudeMdPath, '\n\n' + hook);
  return 'appended';
}

async function install() {
  try {
  intro(chalk.bold('THE STELLA PROTOCOL') + chalk.dim(' — One mind, many satellites.'));

  // Detect AI tool
  const detected = detectAITool();
  const toolLabel = detected === 'claude' ? 'Claude Code' : detected === 'cursor' ? 'Cursor' : null;

  if (toolLabel) {
    note(`Detected: ${chalk.green(toolLabel)}`, 'Environment');
  }

  const tool = detected || 'claude';

  // Ask installation scope
  const scope = await select({
    message: 'Where should skills be installed?',
    options: [
      { value: 'project', label: 'This project', hint: 'recommended' },
      { value: 'user', label: 'My user profile', hint: 'available in all projects' },
    ],
  });

  if (typeof scope === 'symbol') {
    outro('Installation cancelled.');
    return;
  }

  // Ask about Punk Records
  const initBrain = await confirm({
    message: 'Initialize Punk Records (brain/) in this project?',
    initialValue: true,
  });

  if (typeof initBrain === 'symbol') {
    outro('Installation cancelled.');
    return;
  }

  // Install skills
  const s = spinner();
  s.start('Installing skills...');

  const skillsTarget = getSkillsDir(tool, scope);
  const installed = await installSkills(skillsTarget);

  s.stop(`${installed.length} skills installed to ${chalk.dim(skillsTarget)}`);

  // Initialize Punk Records
  if (initBrain) {
    const brainS = spinner();
    brainS.start('Initializing Punk Records...');

    const brainTarget = path.join(process.cwd(), 'brain');
    const written = writeBrainTemplates(brainTarget, path.basename(process.cwd()));

    brainS.stop(written.length > 0
      ? `Punk Records initialized at ${chalk.dim(brainTarget)} (${written.length} files)`
      : `Punk Records already present at ${chalk.dim(brainTarget)} — existing files kept`);
  }

  // Offer to add session hook to CLAUDE.md
  const addHook = await confirm({
    message: 'Add Stella session hook to CLAUDE.md? (auto context on every conversation)',
    initialValue: true,
  });

  if (addHook && typeof addHook !== 'symbol') {
    const hookS = spinner();
    hookS.start('Adding session hook...');

    const result = await addSessionHook(process.cwd());
    const messages = {
      created: 'CLAUDE.md created with session hook',
      appended: 'Session hook appended to existing CLAUDE.md',
      skipped: 'CLAUDE.md already has Stella Protocol section — skipped',
    };
    hookS.stop(messages[result]);
  }

  outro(chalk.green('Ready.') + ' Start by telling your AI what you want to build.');
  } catch (err) {
    outro(chalk.red('Installation failed: ') + err.message);
  }
}

module.exports = { install, installSkills, addSessionHook };
