const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

// if we had prod specific config, it would go here
const loaders = [
	{ test: /\.json$/, loader: 'json-loader' },
	{
		test: /\.js$/,
		loader: [
			{ loader: process.env.IONIC_CACHE_LOADER },
			{ loader: '@angular-devkit/build-optimizer/webpack-loader', options: { sourceMap: true } },
		],
	},
	{
		test: /\.ts$/,
		loader: [
			{ loader: process.env.IONIC_CACHE_LOADER },
			{ loader: '@angular-devkit/build-optimizer/webpack-loader', options: { sourceMap: true } },
			{ loader: process.env.IONIC_WEBPACK_LOADER },
		],
	},
];
const plugins = [new ModuleConcatPlugin(), new PurifyPlugin()];
const prodSpecificConfig = {
	module: { loaders },
	plugins,
};
const prodConfig = webpackMerge(commonConfig, prodSpecificConfig);

module.exports = prodConfig;
