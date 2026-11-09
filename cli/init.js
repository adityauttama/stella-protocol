// Stella Protocol by Aditya Uttama
// https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama

const path = require('path');
const fs = require('fs-extra');
const { intro, outro, spinner } = require('@clack/prompts');
const chalk = require('chalk');
const { BRAIN_TEMPLATES, writeBrainTemplates } = require('./manifest');

async function init() {
  try {
  intro(chalk.bold('Punk Records') + chalk.dim(' — Initialize project brain'));

  const brainTarget = path.join(process.cwd(), 'brain');

  if (fs.existsSync(brainTarget)) {
    const files = await fs.readdir(brainTarget);
    if (files.length > 0) {
      outro(chalk.yellow('brain/ already exists with files. Skipping to avoid overwriting.'));
      return;
    }
  }

  const s = spinner();
  s.start('Initializing Punk Records...');

  writeBrainTemplates(brainTarget, path.basename(process.cwd()));

  s.stop('Punk Records initialized');

  outro(chalk.green('brain/ is ready.') + ' Files: ' + BRAIN_TEMPLATES.join(', '));
  } catch (err) {
    outro(chalk.red('Initialization failed: ') + err.message);
  }
}

module.exports = { init };
