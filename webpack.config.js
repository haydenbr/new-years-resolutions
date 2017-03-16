var path = require('path'),
    webpack = require('webpack'),
    ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

console.log('IONIC_OUTPUT_JS_FILE_NAME',  process.env.IONIC_OUTPUT_JS_FILE_NAME);
module.exports = {
  entry: [process.env.IONIC_APP_ENTRY_POINT],
  output: {
    path: '{{BUILD}}',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.config$/,
        loader: 'file-loader?name=../[name].[ext]'
      },
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
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
