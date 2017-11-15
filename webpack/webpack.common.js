const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
// const config = require('../app.config');
const ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

module.exports = {
  entry: [ process.env.IONIC_APP_ENTRY_POINT ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [ path.resolve('node_modules') ]
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin(stringifyValues(config)),
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      lineToLine: true,
      module: false,
      test: /\.(ts|map|js)($|\?)/i
    }),
    ionicWebpackFactory.getIonicEnvironmentPlugin()
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

// function stringifyValues(config) {
//   var configStrings = {};

//   Object.keys(config).forEach(function (key) {
//     configStrings[key] = JSON.stringify(config[key]);
//   });

//   return configStrings;
// }
