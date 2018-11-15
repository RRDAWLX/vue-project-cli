const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const root = process.cwd()

function resolvePath(...dir) {
  return path.resolve(root, ...dir)
}

module.exports = {
  mode: 'development',

  entry: [resolvePath('src/app.js')],

  output: {
    filename: 'js/[name].js',
    path: resolvePath('dist'),
    publicPath: '/'
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
    // 用于解析 .vue 文件
    new VueLoaderPlugin(),

    // 用于开启模块热替换
    new webpack.HotModuleReplacementPlugin(),

    // 生成一个HTML文件
    new HtmlWebpackPlugin({
      template: resolvePath('src/index.html')
    }),

    new FriendlyErrorsWebpackPlugin(),
  ],

  resolve: {
    extensions: ['.vue', '.js'],
    modules: [
      resolvePath('src'),
      'node_modules',
      resolvePath('node_modules'),
      resolvePath(__dirname, '../node_modules')
    ]
  },

  resolveLoader: {
    modules: [
      'node_modules',
      resolvePath('node_modules'),
      resolvePath(__dirname, '../node_modules')
    ]
  },

  devtool: 'eval-source-map',

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },

    runtimeChunk: {
      name: 'manifest'
    }
  }
}
