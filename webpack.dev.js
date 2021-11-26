'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: { app: './src/client/index.js' },
  output: {
    // path: path.join(__dirname, 'dist'),
    // filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            use: [
              // tsc编译后，再用babel处理
              { loader: 'babel-loader' },
              {
                loader: 'ts-loader',
                // options: {
                //     // 加快编译速度
                //     transpileOnly: true,
                //     // 指定特定的ts编译配置，为了区分脚本的ts配置
                //     configFile: path.resolve(__dirname, './tsconfig.json')
                // }
              },
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            use: ['babel-loader'],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
          {
            test: /\.module\.less$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
          {
            test: /.(png|jpg|gif|jpeg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name]_[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /.(woff|woff2|eot|ttf|otf)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name]_[hash:8][ext]',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react$: path.resolve('./node_modules/react'),
      '@': path.resolve('./src/client'),
    },
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      chunks: ['app'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: 'none',
    },
    historyApiFallback: true,
  },
  stats: 'errors-only',
  devtool: 'cheap-source-map',
}
