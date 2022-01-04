const path = require('path')
const nodeExternal = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css

module.exports = {
  mode: 'production',
  module: {
    rules: [
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
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react$: path.resolve('./node_modules/react'),
      '@': path.resolve('./src/client'),
      '@nodeModules': path.resolve('./node_modules'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'server.css',
    }),
  ],
  entry: './src/server/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
  },
  target: 'node',
  externals: [nodeExternal()],
}
