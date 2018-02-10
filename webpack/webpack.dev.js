const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const loaders = [
	{ test: /\.json$/, loader: 'json-loader' },
	{ test: /\.ts$/, loader: process.env.IONIC_WEBPACK_LOADER },
];
const devSpecificConfig = {
	module: { loaders },
};
const devConfig = webpackMerge(commonConfig, devSpecificConfig);

module.exports = devConfig;
