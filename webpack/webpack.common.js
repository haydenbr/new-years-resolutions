const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const config = require('../app.config');
const injectConstantsPluggin = require('./webpack.inject-constants-plugin');
const ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

const commonConfig = {
	entry: [process.env.IONIC_APP_ENTRY_POINT],
	output: {
		path: '{{BUILD}}',
		publicPath: 'build',
		filename: '[name].js',
		devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
	},
	devtool: process.env.IONIC_SOURCE_MAP_TYPE,
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		modules: [path.resolve('node_modules')],
	},
	module: {},
	plugins: [
		injectConstantsPluggin(config),
		ionicWebpackFactory.getIonicEnvironmentPlugin(),
		ionicWebpackFactory.getCommonChunksPlugin(),
	],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},
};

module.exports = commonConfig;
