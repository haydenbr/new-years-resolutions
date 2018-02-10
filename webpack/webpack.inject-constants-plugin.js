const webpack = require('webpack');

function stringifyObjectValues(obj) {
	let configStrings = {};

	Object.keys(obj).forEach(key => (configStrings[key] = JSON.stringify(obj[key])));

	return configStrings;
}

function injectConstantsPlugin(config) {
	return new webpack.DefinePlugin(stringifyObjectValues(config));
}

module.exports = injectConstantsPlugin;
