const chalk = require('chalk')

module.exports = ({mode}) => {
  switch (mode) {
  case 'development':
    return require('../config/webpack.dev')

  case 'production':
    return require('../config/webpack.prod')

  default:
    console.log(chalk.red(`没有模式 ${mode} 对应的 webpack 配置`))
    process.exit(1)
  }
}