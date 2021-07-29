const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.join(__dirname, 'client', 'src', 'index.js')],
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'client', 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'src', 'index.html')
    })
  ]
}