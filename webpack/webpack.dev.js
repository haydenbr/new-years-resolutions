const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

module.exports = webpackMerge(commonConfig, {
  output: {
    path: '{{BUILD}}',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction()
  }
});
