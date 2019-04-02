#!/usr/bin/env node

/**
 * 在执行 git commit 时，校验暂存区里 package.json 中的 version 字段是否已经升级。
 */

const execSync = require('child_process').execSync
const semver = require('semver')
const chalk = require('chalk')

// 获取暂存区中 package.json 的 version
let newVersion = JSON.parse(execSync('git cat-file -p :package.json', {encoding: 'utf8'})).version
// 获取版本库中 package.json 的 version
let oldVersion = JSON.parse(execSync('git cat-file -p HEAD^{tree}:package.json', {encoding: 'utf8'})).version

if (semver.gt(newVersion, oldVersion)) {
  console.log(chalk.green('✔ package.json 中的 version 已升级'))
  console.log()
  process.exit(0)
} else {
  console.log(chalk.red('✘ package.json 中的 version 未升级！'))
  console.log()
  process.exit(1)
}
