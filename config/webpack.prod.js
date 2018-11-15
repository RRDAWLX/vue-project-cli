const path = require('path'),
  VueLoaderPlugin = require('vue-loader/lib/plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: {
    main: './src/app.js'
  },

  output: {
    filename: 'js/[name].[chunkhash:6].js',
    path: path.resolve(__dirname, '../dist'),
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
        // exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.css|less$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
              name: 'image/[name].[hash:6].[ext]'
              // outputPath: 'images/'  // 用于将图片打包至指定目录，已被发布到单独的图片域
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
    new CleanWebpackPlugin(['../dist'], {allowExternal: true}),

    // 用于解析 .vue 文件
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:6].css',
    }),

    // 生成一个HTML文件
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],

  resolve: {
    extensions: ['.vue', '.js']
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],

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
