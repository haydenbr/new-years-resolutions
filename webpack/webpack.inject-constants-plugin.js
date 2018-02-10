const webpack = require('webpack');
const util = require('../scripts/script-utilities');

function injectConstantsPlugin(config) {
	return new webpack.DefinePlugin(util.stringifyObjectValues(config));
}

module.exports = injectConstantsPlugin;
