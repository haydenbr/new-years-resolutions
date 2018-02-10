const _ = require('lodash');
const yn = require('yn');
const packageJson = require('./package.json');
const ionicConfig = require('./ionic.config.json');

const defaults = {
	APP_URL_SCHEME: 'newyears',
	PROFILE: 'dev',
	TITLE: 'New Years Resolutions',
};
const env = {
	dev: {
		API_SERVER: 'localhost:3000',
		APP_URL_SCHEME: `${defaults.APP_URL_SCHEME}-dev`,
		REDUX_DEVTOOLS: true,
		TITLE: `${defaults.TITLE} - Dev`,
	},
	test: {
		API_SERVER: 'https://test-api.example.com',
		APP_URL_SCHEME: `${defaults.APP_URL_SCHEME}-test`,
		REDUX_DEVTOOLS: true,
		TITLE: `${defaults.TITLE} - Test`,
	},
	prod: {
		API_SERVER: 'https://api.example.com',
		APP_URL_SCHEME: defaults.APP_URL_SCHEME,
		REDUX_DEVTOOLS: false,
		TITLE: defaults.TITLE,
	},
};

function dumpConfig(config) {
	console.log('#############');
	_.each(config, (v, k) => console.log(`\t${k}: ${v}`));
	console.log('#############');
}

function getConfig() {
	let profile = (process.env.PROFILE || defaults.PROFILE).toLowerCase();
	let config = Object.assign({}, env[profile]);

	// Check for overrides
	config.API_SERVER = process.env.API_SERVER || config.API_SERVER;
	config.APP_ID = ionicConfig.app_id;
	config.APP_URL_SCHEME = process.env.APP_URL_SCHEME || config.APP_URL_SCHEME;
	config.LOCAL_DEV = yn(process.env.LOCAL_DEV, { default: profile === 'dev' });
	config.PROFILE = profile;
	config.REDUX_DEVTOOLS = yn(process.env.REDUX_DEVTOOLS, { default: config.REDUX_DEVTOOLS });
	config.VERSION = packageJson.version;
	config.PROD_MODE = process.env.IONIC_ENV === 'prod';

	return config;
}

const config = getConfig();

module.exports = config;

dumpConfig(config);
