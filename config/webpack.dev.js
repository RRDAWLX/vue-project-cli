const baseConfig = require('./webpack.base')
const customConfig = require('./custom')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.css|less$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'image/[name].[ext]'
            }
          },
        ]
      },
    ]
  },

  plugins: [
    // 用于开启模块热替换
    new webpack.HotModuleReplacementPlugin(),

    new FriendlyErrorsWebpackPlugin(),
  ],

  devtool: 'eval-source-map'
}, customConfig.webpack || {})
