var path = require('path')
var config = require('../config')
var entries = require('./getEntries')()

module.exports = {
  entry: [
    './build/dev-client', // WebpackDevServer host and port
    './src/index.js',  // 编译的入口
  ],
  output: {
    path: config.devpath + '/assets/',
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],  // import时到哪些地方去寻找模块
    extensions: ['', '.js', '.jsx'],
    alias: config.alias
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: config.devpath
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'assets/images/[name].[ext]'
        }
      },
      {
        test: /\.css?$/,
        loaders : [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less?$/,
        loaders : [
          'style-loader',
          'css-loader',
          'less-loader?{"sourceMap":true}'
        ],
        include: config.devpath
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
