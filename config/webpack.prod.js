require('./browserslist')
const baseConfig = require('./webpack.base')
const customConfig = require('./custom')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const postcssLoader = require('./postcss-loader')


module.exports = merge(baseConfig, {
  mode: 'production',

  output: {
    filename: 'js/[name].[contenthash:6].js',
  },

  module: {
    rules: [
      {
        test: /\.css|less$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          postcssLoader,
          'less-loader',
        ]
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'image/[name].[hash:6].[ext]'
              // outputPath: 'images/'  // 用于将图片打包至指定目录，以便发布到单独的图片域
              // publicPath: 'https://mjrhd.vipstatic.com/'   // 用于指定图片资源发布路径
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          },
        ]
      }
    ]
  },

  plugins: [
    // 给予模块基于相对路径生成的 hash 作为模块标识符，可以避免 vendors 内容未变但模块 id 被修改。
    // 建议在 production 模式中使用此插件。
    new webpack.HashedModuleIdsPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ]
  }
}, customConfig.webpack || {})
