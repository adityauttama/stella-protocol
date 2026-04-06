const path = require('path');
const fs = require('fs-extra');
const { intro, outro, spinner } = require('@clack/prompts');
const chalk = require('chalk');

async function init() {
  intro(chalk.bold('Punk Records') + chalk.dim(' — Initialize project brain'));

  const packageDir = path.resolve(__dirname, '..');
  const brainSource = path.join(packageDir, 'punk-records');
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

  await fs.ensureDir(brainTarget);

  const templates = ['log-pose.md', 'architecture.md', 'vivre-cards.md', 'ideas.md'];
  for (const template of templates) {
    const src = path.join(brainSource, template);
    const dest = path.join(brainTarget, template);
    await fs.copy(src, dest);
  }

  // Replace project name placeholder
  const logPosePath = path.join(brainTarget, 'log-pose.md');
  const logPose = await fs.readFile(logPosePath, 'utf-8');
  const projectName = path.basename(process.cwd());
  await fs.writeFile(logPosePath, logPose.replace('{project-name}', projectName));

  s.stop('Punk Records initialized');

  outro(chalk.green('brain/ is ready.') + ' Files: log-pose.md, architecture.md, vivre-cards.md, ideas.md');
}

module.exports = { init };
