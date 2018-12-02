const merge = require('webpack-merge')
const customConfig = require('./custom')

module.exports = merge({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}, customConfig.env || {})