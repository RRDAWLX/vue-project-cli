#!/usr/bin/env node

const program = require('commander')
const utils = require('../utils')

program.option('--mode <mode>', '项目模式，根据此值选择 webpack 配置，可选项：development、production。', 'production')
  .option('--node-env <env>', '设置 process.env.NODE_ENV 的值，默认与 mode 为相同值。')
  .parse(process.argv)

utils.checkMode(program.mode)

process.env.NODE_ENV = program.nodeEnv || program.mode

console.log(utils.getWebpackConfig({
  mode: program.mode
}))