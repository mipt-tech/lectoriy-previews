/* eslint-disable prettier/prettier */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  context: path.join(__dirname, 'src'),
  entry: ['./main.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /(\.ttf|\.png|\.svg)$/,
        use: ['file-loader?name=[name].[ext]']
      }
    ]
  }
}
