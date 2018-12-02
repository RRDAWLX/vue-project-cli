const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const env = require('./env')
const root = process.cwd()

module.exports = {
  context: root,

  entry: ['./src/index.js'],

  output: {
    filename: 'js/[name].js',
    path: path.resolve(root, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.vue', '.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      path.resolve(root, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ],
    alias: {
      'src': path.resolve('root', 'src/')
    }
  },

  resolveLoader: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      'node_modules',
      path.resolve(root, 'node_modules'),
    ]
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin(env),

    // 用于解析 .vue 文件
    new VueLoaderPlugin(),

    // 生成一个HTML文件
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'src/index.html')
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },

        styles: {
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },

    runtimeChunk: {
      name: 'manifest'
    }
  }
}
