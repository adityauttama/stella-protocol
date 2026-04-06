#!/usr/bin/env node

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
    const { install } = require('./install');
    await install();
  });

program
  .command('init')
  .description('Initialize Punk Records (brain/) in the current project')
  .action(async () => {
    const { init } = require('./init');
    await init();
  });

program
  .command('status')
  .description('Show current project status from Punk Records')
  .action(async () => {
    const { status } = require('./status');
    await status();
  });

program.parse();
