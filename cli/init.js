// Stella Protocol by Aditya Uttama
// https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama

const path = require('path');
const fs = require('fs-extra');
const { intro, outro, spinner } = require('@clack/prompts');
const chalk = require('chalk');

async function init() {
  try {
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

  const templates = ['log-pose.md', 'architecture.md', 'vivre-cards.md', 'ideas.md', 'scope-changes.md', 'design-system.md', 'project-context.md'];
  for (const template of templates) {
    const src = path.join(brainSource, template);
    const dest = path.join(brainTarget, template);
    await fs.copy(src, dest);
  }

  const projectName = path.basename(process.cwd());
  const today = new Date().toISOString().split('T')[0];

  // Replace project name placeholder in log-pose.md
  const logPosePath = path.join(brainTarget, 'log-pose.md');
  const logPose = await fs.readFile(logPosePath, 'utf-8');
  await fs.writeFile(logPosePath, logPose.replace('{project-name}', projectName).replace('YYYY-MM-DD', today));

  // Replace project name placeholder in project-context.md
  const projectContextPath = path.join(brainTarget, 'project-context.md');
  const projectContext = await fs.readFile(projectContextPath, 'utf-8');
  await fs.writeFile(projectContextPath, projectContext.replace('{project-name}', projectName));

  s.stop('Punk Records initialized');

  outro(chalk.green('brain/ is ready.') + ' Files: log-pose.md, project-context.md, architecture.md, vivre-cards.md, ideas.md');
  } catch (err) {
    outro(chalk.red('Initialization failed: ') + err.message);
  }
}

module.exports = { init };
