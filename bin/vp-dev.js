#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('../config/webpack.dev')

const options = {
  contentBase: path.resolve(process.cwd(), 'dist'),
  host: 'localhost',
  port: 8081,
  historyApiFallback: true,   // 支持单页应用，用 index.html 响应 404 请求，不会响应被代理的请求。
  proxy: {
    '/': {
      target: 'http://localhost:5000',
      bypass: req => {
        // 需要代理的请求无需返回任何值
        // 不需要代理的请求返回 false 或者响应请求的内容的路径
        if (/^\/api\//.test(req.path)) {
          return
        }
        return false
      },
      pathRewrite: {'^/api': ''},
      router: req => {
        // 当发起请求的链接中带有参数 debug 且值为 true 时，将请求代理至另外一台 api 服务器，比如测试环境的服务器。
        if (/(\?|&)debug=true(&|$)/.test(req.get('Referer'))) {
          return 'http://localhost:6000'
        }
      }
    }
  },
  overlay: {    // 在网页中显示编译警告与错误
    warnings: true,
    errors: true
  },
  hot: true,   // 开启模块热替换
  quiet: true
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(options.port, options.host, () => {
  console.log(chalk.blue(`dev server is listening at ${options.port}`))
})
