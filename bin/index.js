#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const pkg = require('../package')

program.version(pkg.version, '-v, --version')
  .command('dev', 'develop project')
  .command('build', 'build project')
  .parse(process.argv)