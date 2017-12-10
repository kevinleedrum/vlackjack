const webpack = require('webpack');

let config = require('./webpack.base.config.js');

config.devtool = '#source-map';
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]);
config.devServer = {
  stats: {
    modules: false
  }
};

module.exports = config;
