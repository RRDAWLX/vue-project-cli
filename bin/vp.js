#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package')

program.version(pkg.version, '-v, --version')
  .command('dev', '项目开发')
  .command('build', '项目构建')
  .command('inspect', '查看项目配置')
  .command('check-version', '校验项目中 package.json 的 version 字段是否已升级')
  .command('add-version-tag', '给项目仓库打上基于 package.json 中 version 的 tag')
  .parse(process.argv)