const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.[hash].js',
    publicPath: ''
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
     template: path.resolve(__dirname, 'src', 'index.html'),
     filename: 'index.html'
   })
  ],
  resolve: { extensions: ['.jsx', '.js'] },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.css$/, exclude: /node_modules/,
        use: ['style-loader', { loader: 'css-loader', options: { modules: true, importLoaders: 1 } }]
      },
      { test: /(\.ttf|\.png|\.svg)$/, exclude: /node_modules/, use: ['file-loader?name=[name].[ext]'] }
    ]
  }
};
