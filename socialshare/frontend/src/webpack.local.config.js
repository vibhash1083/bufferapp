var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config')

// js webpack dev server
config.entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './index'
]

// override django's STATIC_URL for webpack bundles
config.output.publicPath = 'http://localhost:3000/static/bundle/'

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats.json'}),
])

// Add a loader for JSX files with react-hot enabled
config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
  {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
  }
)

module.exports = config
