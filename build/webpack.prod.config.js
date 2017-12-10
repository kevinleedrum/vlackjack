const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = require('./webpack.base.config.js');

config.module.rules[0].options = {
  loaders: {
    css: ExtractTextPlugin.extract({
      use: 'css-loader',
      fallback: 'vue-style-loader'
    })
  }
};
config.output.filename = 'js/[name].[chunkhash].js';
config.plugins = config.plugins.concat([
  new ExtractTextPlugin('css/app.[contenthash].css'),
  new webpack.optimize.CommonsChunkPlugin('vendor'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    }
  })
]);

module.exports = config;
