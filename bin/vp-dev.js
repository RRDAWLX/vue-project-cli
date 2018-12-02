#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const utils = require('../utils')

program.option('--mode <mode>', '项目模式，根据此值选择 webpack 配置，可选项：development、production。', 'development')
  .option('--node-env <env>', '设置 process.env.NODE_ENV 的值，默认与 mode 为相同值。')
  .parse(process.argv)

utils.checkMode(program.mode)

process.env.NODE_ENV = program.nodeEnv || program.mode

let webpackConfig = utils.getWebpackConfig({
  command: 'dev',
  mode: program.mode
})

let proxyTargets = {
  dev: 'http://localhost:8081',   // 本地开发时的转发地址
  debug: 'http://localhost:8082'  // 联调时的转发地址
}
let customConfig = require('../config/custom')
Object.assign(proxyTargets, customConfig.proxyTargets || {})

const options = {
  contentBase: path.resolve(process.cwd(), 'dist'),
  host: 'localhost',
  port: 8080,
  historyApiFallback: true,   // 支持单页应用，用 index.html 响应 404 请求，不会响应被代理的请求。
  proxy: {
    '/': {
      bypass: req => {
        // 需要代理的请求无需返回任何值
        // 不需要代理的返回请求路径
        if (!/^\/api\//.test(req.path)) {
          return req.path
        }
      },

      target: proxyTargets.dev,

      router: req => {
        // 当发起请求的链接中带有参数 debug 且值为 true 时，将请求代理至另外一台 api 服务器，比如测试环境的服务器。
        if (/(\?|&)debug=true(&|$)/.test(req.get('Referer'))) {
          return proxyTargets.debug
        }
      },

      pathRewrite: {'^/api': ''}
    }
  },
  overlay: {    // 在网页中显示编译警告与错误
    warnings: true,
    errors: true
  },
  hot: true,   // 开启模块热替换
  quiet: true
}

if (webpackConfig.devServer) {
  Object.assign(options, webpackConfig)
  delete webpackConfig.devServer
}

webpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
compiler.hooks.done.tap('done', hint)

const server = new webpackDevServer(compiler, options)

server.listen(options.port, options.host, () => {
  console.log()
  hint()
  console.log(`${chalk.bgBlue.black(' WAIT ')} ${chalk.blue('Compiling...')}`)
})

function hint() {
  console.log(chalk.cyan(`mode: ${program.mode}`))
  console.log(chalk.cyan(`process.env.NODE_ENV: ${process.env.NODE_ENV}`))
  console.log(chalk.cyan(`dev server is listening at ${options.https ? 'https' : 'http'}://${options.host}:${options.port}`))
  console.log()
}
