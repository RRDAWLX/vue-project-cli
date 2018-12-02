#!/usr/bin/env node

const program = require('commander')
const webpack = require('webpack')
const chalk = require('chalk')
const rimraf = require('rimraf')
const spinner = require('ora')('building...')
const utils = require('../utils')

program.option('--mode <mode>', '项目模式，根据此值选择 webpack 配置，可选项：development、production。', 'production')
  .option('--node-env <env>', '设置 process.env.NODE_ENV 的值，默认与 mode 为相同值。')
  .parse(process.argv)

utils.checkMode(program.mode)

process.env.NODE_ENV = program.nodeEnv || program.mode

let webpackConfig = utils.getWebpackConfig({
  command: 'build',
  mode: program.mode
})

spinner.start()

rimraf(webpackConfig.output.path, err => {
  if (err) {
    spinner.stop()
    console.log(err)
    return
  }

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()

    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()
    const hasErrors = stats.hasErrors()
    const hasWarnings = stats.hasWarnings()

    if (hasErrors) {
      console.error(info.errors)
    }

    if (hasWarnings) {
      console.warn(info.warnings)
    }

    if (!hasErrors && !hasWarnings) {
      console.log(chalk.green('✔ succeed!'))
    }
  })
})