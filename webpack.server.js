const path = require('path')
const nodeExternal = require('webpack-node-externals')

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
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react$: path.resolve('./node_modules/react'),
      '@': path.resolve('./src/client'),
    },
  },
  target: 'node',
  entry: './src/server/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
  },
  externals: [nodeExternal()],
}
