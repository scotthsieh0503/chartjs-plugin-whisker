const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chartjs-plugin-whisker.js'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/moment/)
  ]
}
