#!/usr/bin/env node

const program = require('commander')
const resolve = require('path').resolve
const mkdirSync = require('fs').mkdirSync
const copy = require('copy-concurrently')
const chalk = require('chalk')
const execSync = require('child_process').execSync
const ora = require('ora')
const pkg = require('../package.json')
let dir = ''

program
  .arguments('[directory]')
  .action((directory) => {
    dir = directory || dir
  })
  .option('--no-update', `不检查当前安装的 ${pkg.name} 是否为最新版本，也不更新。`)
  .option('--no-install', '不执行 npm install 命令')
  .parse(process.argv)

// 检查当前安装的 cli 工具是否为最新版本
if (program.update) {
  let latestVersion = execSync(`npm view ${pkg.name} version`, { encoding: 'utf8' })

  if (latestVersion !== pkg.version) {
    console.log(chalk.red(`${pkg.name}有新版本，开始安装：`))
    execSync(`npm install ${pkg.name} -g`, {
      encoding: 'utf8',
      stdio: 'inherit',
    })
  }
}

// 初始化项目
let targetDir = resolve(process.cwd(), dir)
mkdirSync(targetDir, { recursive: true })

let templateDir = resolve(__dirname, '../template')
let sources = [
  'mock/',
  'src/',
  'vp.config/',
  '.eslintrc.js',
  'package.json',
  'vp.config.personal.js',
]
let tasks = []
const spinner = ora('initializing...')
spinner.start()

sources.forEach(source => {
  tasks.push(
    copy(
      resolve(templateDir, source),
      resolve(targetDir, source)
    )
  )
})

/**
  由于目前 npm 包中的 .gitignore 文件会在包安装过程中被重命名为 .npmignore，
  所以 npm 包中包含的是 gitignore 文件，在项目初始化时重命名为 .gitignore。
 */
tasks.push(copy(
  resolve(templateDir, 'gitignore'),
  resolve(targetDir, '.gitignore')
))

Promise.all(tasks).then(() => {
  spinner.stop()
  let cmd = 'git init'

  if (program.install) {
    cmd += '&& npm install'
  }

  execSync(cmd, {
    encoding: 'utf8',
    cwd: targetDir,
    stdio: 'inherit',
  })

  console.log(chalk.green('✔ 项目初始化成功，请修改项目的基础配置项。'))
}).catch(e => {
  spinner.stop()
  console.log(chalk.red('✘ 项目初始化失败'))
  console.log(e)
})
