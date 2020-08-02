#!/usr/bin/env node

/**
 * 此命令的应用场景是在发布项目时自动为项目打上版本号 tag，并推送到远端仓库。
 */
const program = require('commander')
const execSync = require('child_process').execSync
const semver = require('semver')
const chalk = require('chalk')
const Opts = {encoding: 'utf8'}

program.parse(process.argv)

// 版本号格式：v1.2.3
let currentVersion = JSON.parse(execSync('git cat-file -p "HEAD^{tree}:package.json"', Opts)).version
let versionTags = execSync('git tag -l "v*.*.*"', Opts).trim().split(/\r?\n/)
let recentVersionTag = versionTags[0]
versionTags.forEach(tag => {
  if (semver.gt(tag, recentVersionTag)) {
    recentVersionTag = tag
  }
})

// 当前的版本号要大于最近一个版本号标签中的版本号
if (recentVersionTag) {   // 如果存在版本号标签
  let tagType = execSync(`git cat-file -t ${recentVersionTag}`, Opts).trim()
  let recentVersionCommit

  if (tagType === 'tag') {
    recentVersionCommit = execSync(`git cat-file -p ${recentVersionTag}`, Opts).slice(7, 14)
  } else {
    recentVersionCommit = execSync(`cat .git/refs/tags/${recentVersionTag}`, Opts).slice(0, 7)
  }

  let currentCommit = execSync('git log --pretty=oneline', Opts).slice(0, 7)

  // 且最近一个版本号标签对应的 commit 不是当前的 commit
  if (recentVersionCommit !== currentCommit) {
    let recentVersion = recentVersionTag.slice(1)

    // 则需校验当前版本号是否大于上一个版本号
    if (semver.lte(currentVersion, recentVersion)) {
      console.log(chalk.red(`✘ 当前版本号 ${currentVersion} 未大于上一个发布版本号 ${recentVersion}，请升级版本号！`))
      process.exit(1)
    }
  } else {
    console.log(chalk.red('✘ 当前 commit 已有版本 tag ！'))
    process.exit(1)
  }
}

execSync(`git tag -a v${currentVersion} -m "${new Date().toLocaleString()}" -f && git push --tags -f`)
