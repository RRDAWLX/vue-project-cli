const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('./env')
const root = process.cwd()

function resolve(...dir) {
  return path.resolve(root, ...dir)
}

module.exports = {
  context: root,

  entry: ['./src/index.js'],

  output: {
    filename: 'js/[name].js',
    path: resolve('dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.vue', '.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      resolve('node_modules'),
      resolve(__dirname, '../node_modules'),
    ],
    alias: {
      'vue$': resolve('node_modules/vue/dist/vue.esm.js'),
      '@': resolve('src'),
    },
    // https://webpack.docschina.org/configuration/resolve/#resolve-symlinks
    // 此配置项主要是在本地测试自己开发的独立包时起作用，比如在测试公用组件包。
    symlinks: false,
  },

  resolveLoader: {
    modules: [
      resolve(__dirname, '../node_modules'),
      'node_modules',
      resolve('node_modules'),
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
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings',
            [
              '@babel/plugin-transform-runtime',
              {
                'corejs': 3,
              }
            ],
          ],
          compact: false,
          cacheDirectory: true,
        },
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin(env),

    // 用于解析 .vue 文件
    new VueLoaderPlugin(),

    // 生成一个HTML文件
    new HtmlWebpackPlugin({
      template: resolve('src/index.html')
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
