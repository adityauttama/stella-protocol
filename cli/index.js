#!/usr/bin/env node
// Stella Protocol by Aditya Uttama
// https://www.linkedin.com/in/adityauttama/ | https://github.com/adityauttama


const { Command } = require('commander');
const { version } = require('../package.json');

const program = new Command();

program
  .name('stella')
  .description('The Stella Protocol — PM-first AI development framework')
  .version(version);

program
  .command('install')
  .description('Install Stella Protocol skills and initialize Punk Records')
  .action(async () => {
    try {
      const { install } = require('./install');
      await install();
    } catch (err) {
      const chalk = require('chalk');
      console.error(chalk.red('Install failed:'), err.message);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize Punk Records (brain/) in the current project')
  .action(async () => {
    try {
      const { init } = require('./init');
      await init();
    } catch (err) {
      const chalk = require('chalk');
      console.error(chalk.red('Init failed:'), err.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Show current project status from Punk Records')
  .action(async () => {
    try {
      const { status } = require('./status');
      await status();
    } catch (err) {
      const chalk = require('chalk');
      console.error(chalk.red('Status failed:'), err.message);
      process.exit(1);
    }
  });

program.parse();
