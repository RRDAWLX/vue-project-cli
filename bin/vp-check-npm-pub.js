#!/usr/bin/env node

/**
 * 在 npm publish 执行前做以下检查工作：
 * 1、README是否已更新。
 * 2、当前分支是否为 master。
 * 3、是否有未提交的修改。
 * 4、本地仓库是否与远端保持一致。
 */

const execSync = require('child_process').execSync
const chalk = require('chalk')
const readlineSync = require('readline-sync')
const execOpts = {
  encoding: 'utf8',
}

// README是否已更新
let readmeUpdated = readlineSync.keyInYN('README.md 是否已更新？')
readmeUpdated = readmeUpdated === true

if (readmeUpdated) {
  console.log(chalk.green('✔ README.md 已更新'))
} else {
  console.log(chalk.red('✘ README.md 未更新'))
}

// 当前分支是否为 master
const masterRegexp = /\bmaster\b/
let branchInfo = execSync('git branch', execOpts)
let isMaster = masterRegexp.test(branchInfo)

if (isMaster) {
  console.log(chalk.green('✔ 当前分支为 master'))
} else {
  console.log(chalk.red('✘ 当前分支非 master'))
}

// 是否有未提交的修改
let statusInfo = execSync('git status --porcelain', execOpts)
let clean = statusInfo.length === 0

if (clean) {
  console.log(chalk.green('✔ 无未提交修改'))
} else {
  console.log(chalk.red('✘ 有未提交修改'))
}

// 本地仓库是否与远端保持一致
try {
  execSync('git fetch')
} catch (e) {
  throw new Error('git fetch 失败，请确保能访问到远端仓库。')
}

let diffInfo = execSync('git diff master origin/master --shortstat', execOpts)
let upToDate = diffInfo.length === 0

if (upToDate) {
  console.log(chalk.green('✔ 本地仓库已与远端仓库同步'))
} else {
  console.log(chalk.red('✘ 本地仓库未与远端仓库同步'))
}

if (readmeUpdated && isMaster && clean && upToDate) {
  process.exit(0)
} else {
  process.exit(1)
}