// 项目的自定义配置，包含公共配置和开发者个人配置。
// 公共配置位于项目根目录的 vp.config.js 文件或 vp.config/index.js 文件
// 开发者个人配置位于项目根目录的 vp.config.personal.js 文件或 vp.config.personal/index.js 文件

const path = require('path')
const merge = require('webpack-merge')

let config = {}
try {
  config = merge(config, require(path.resolve(process.cwd(), 'vp.config')))
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    console.log(e)
    process.exit(1)
  }
}

try {
  config = merge(config, require(path.resolve(process.cwd(), 'vp.config.personal')))
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    console.log(e)
    process.exit(1)
  }
}

module.exports = config