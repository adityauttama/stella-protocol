const path = require('path');
const fs = require('fs-extra');
const { intro, outro, select, confirm, spinner, note } = require('@clack/prompts');
const chalk = require('chalk');

const SKILLS = [
  'stella-protocol',
  'stella-define',
  'stella-build',
  'stella-review',
  'stella-close',
];

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

async function install() {
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

  const packageDir = path.resolve(__dirname, '..');
  const skillsSource = path.join(packageDir, 'skills');
  const skillsTarget = getSkillsDir(tool, scope);

  await fs.ensureDir(skillsTarget);

  for (const skill of SKILLS) {
    const src = path.join(skillsSource, skill);
    const dest = path.join(skillsTarget, skill);
    await fs.copy(src, dest, { overwrite: true });
  }

  s.stop(`${SKILLS.length} skills installed to ${chalk.dim(skillsTarget)}`);

  // Initialize Punk Records
  if (initBrain) {
    const brainS = spinner();
    brainS.start('Initializing Punk Records...');

    const brainSource = path.join(packageDir, 'punk-records');
    const brainTarget = path.join(process.cwd(), 'brain');

    await fs.ensureDir(brainTarget);

    const templates = ['log-pose.md', 'architecture.md', 'vivre-cards.md', 'ideas.md', 'scope-changes.md', 'design-system.md'];
    for (const template of templates) {
      const src = path.join(brainSource, template);
      const dest = path.join(brainTarget, template);
      if (!fs.existsSync(dest)) {
        await fs.copy(src, dest);
      }
    }

    // Replace project name placeholder in log-pose
    const logPosePath = path.join(brainTarget, 'log-pose.md');
    const logPose = await fs.readFile(logPosePath, 'utf-8');
    const projectName = path.basename(process.cwd());
    await fs.writeFile(logPosePath, logPose.replace('{project-name}', projectName));

    brainS.stop(`Punk Records initialized at ${chalk.dim(brainTarget)}`);
  }

  // Offer to add session hook to CLAUDE.md
  const addHook = await confirm({
    message: 'Add Stella session hook to CLAUDE.md? (auto context on every conversation)',
    initialValue: true,
  });

  if (addHook && typeof addHook !== 'symbol') {
    const hookS = spinner();
    hookS.start('Adding session hook...');

    const hookSource = path.join(packageDir, 'punk-records', 'stella-claude-md.md');
    const claudeMdPath = path.join(process.cwd(), 'CLAUDE.md');

    const hookContent = await fs.readFile(hookSource, 'utf-8');
    // Extract just the session hook section (skip the template header)
    const hookSection = hookContent.split('## Stella Protocol')[1];
    const cleanHook = '## Stella Protocol' + hookSection;

    if (fs.existsSync(claudeMdPath)) {
      const existing = await fs.readFile(claudeMdPath, 'utf-8');
      if (!existing.includes('Stella Protocol')) {
        await fs.appendFile(claudeMdPath, '\n\n' + cleanHook);
        hookS.stop('Session hook appended to existing CLAUDE.md');
      } else {
        hookS.stop('CLAUDE.md already has Stella Protocol section — skipped');
      }
    } else {
      await fs.writeFile(claudeMdPath, cleanHook);
      hookS.stop('CLAUDE.md created with session hook');
    }
  }

  outro(chalk.green('Ready.') + ' Start by telling your AI what you want to build.');
}

module.exports = { install };
