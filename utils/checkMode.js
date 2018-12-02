const chalk = require('chalk')

const modes = [
  'development',
  'production'
]

module.exports = mode => {
  if (!modes.includes(mode)) {
    console.log(chalk.red('mode 的可选项为 development、production！'))
    process.exit(1)
  }
}