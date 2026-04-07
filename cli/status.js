// Stella Protocol by Aditya Uttama
// https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

async function status() {
  const brainDir = path.join(process.cwd(), 'brain');
  const logPosePath = path.join(brainDir, 'log-pose.md');

  if (!fs.existsSync(logPosePath)) {
    console.log(chalk.yellow('No brain/log-pose.md found.'));
    console.log('Run ' + chalk.bold('stella init') + ' to initialize Punk Records.');
    return;
  }

  const content = await fs.readFile(logPosePath, 'utf-8');

  // Parse frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    const fm = fmMatch[1];
    const lines = fm.split('\n').filter(Boolean);

    console.log(chalk.bold('\n  THE STELLA PROTOCOL — Project Status\n'));

    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      if (key && value) {
        const label = key.trim().replace(/"/g, '');
        console.log(`  ${chalk.dim(label + ':')} ${value}`);
      }
    }
    console.log('');
  }

  // Print body (skip frontmatter)
  const body = content.replace(/^---\n[\s\S]*?\n---\n*/, '');
  console.log(body);
}

module.exports = { status };
