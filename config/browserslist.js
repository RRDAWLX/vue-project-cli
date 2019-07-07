// 对此模块的引用必须放在对依赖 browserslist 的模块的引用前
const path = require('path')
const package = require(path.join(process.cwd(), 'package.json'))

if (!package.browserslist) {
  process.env.BROWSERSLIST = '> 1%, last 2 versions'
}