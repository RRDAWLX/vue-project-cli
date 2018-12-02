#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package')

program.version(pkg.version, '-v, --version')
  .command('dev', '项目开发')
  .command('build', '项目构建')
  .command('inspect', '查看项目配置')
  .parse(process.argv)