#!/usr/bin/env node

const { exec, execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const spinner = require('ora')('processing...')
const Table = require('cli-table3')
const tempFile = path.resolve(__dirname, '__temp.json')

spinner.start()

// 读取当前项目的直接依赖模块
// 由于依赖信息内容可能会很长，所以先将其输出到暂存文件中，再从文件中读取。
execSync(`npm list --depth=0 --json > ${tempFile}`)
let temp = require(tempFile)
let projectName = temp.name
let deps = temp.dependencies
deps = Object.entries(deps).map(([name, info]) => ({
  name,
  currentVersion: info.version,
}))
fs.unlink(tempFile, () => {})
let tasks = []

for (let dep of deps) {
  tasks.push(new Promise((resolve, reject) => {
    exec(`npm view ${dep.name} versions`, (e, versions) => {
      if (e) {
        return reject(e)
      }

      versions = versions
        .trim()
        .slice(1, -1)
        .replace(/'/g, '')
        .split(',')
        .map(v => v.trim())

      dep.latestVersion = versions[versions.length -1]
      dep.lag = versions.length - 1 - versions.indexOf(dep.currentVersion)
      resolve()
    })
  }))
}

let table = new Table()
table.push([{
  colSpan: 4,
  content: chalk.red(`${projectName} 当前安装的直接依赖模块的版本信息`),
  hAlign: 'center',
}])
let heads = ['模块名', '安装版本', '最新版本', '落后版本数']
heads = heads.map(head => chalk.red(head))
table.push(heads)
Promise.all(tasks).then(() => {
  deps.sort((pre, next) => next.lag - pre.lag)

  for (let dep of deps) {
    table.push([
      dep.name,
      dep.currentVersion,
      dep.latestVersion,
      dep.lag,
    ])
  }

  spinner.stop().clear()
  console.log(table.toString())
  process.exit(0)
}).catch(e => {
  spinner.stop().clear()
  console.log(e)
  process.exit(1)
})