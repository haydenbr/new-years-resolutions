const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const xml2js = require('xml2js');
const yaml = require('js-yaml');

// Just a few functions that are common to mutliple build scripts

function bumpVersion(versionBump) {
	let newVersion = getNextVersion(versionBump);
	let packageJson = getPackageJson();

	packageJson.version = newVersion;

	return writeFile(path.resolve(__dirname, '..', 'package.json'), JSON.stringify(packageJson, null, 4));
}

function convertJsonToXml(data) {
	return new xml2js.Builder().buildObject(data);
}

function convertYamlToJson(data) {
	return yaml.load(data);
}

function convertJsonToYaml(data) {
	return yaml.dump(data);
}

function execFile(command, args) {
	return new Promise((resolve, reject) => {
		childProcess.execFile(command, args, (err, stdout) => (err ? reject(err) : resolve(stdout)));
	});
}

function getCurrentVersion() {
	return getPackageJson().version;
}

function getDockerHubRepository() {
	return getPackageJson().dockerHubRepository;
}

function getCurrentDockerImageTag() {
	return `${getDockerHubRepository()}:${getCurrentVersion()}`;
}

function getNextVersion(versionBump) {
	let versionBumpOptions = ['major', 'minor', 'patch'];

	if (!versionBumpOptions.includes(versionBump)) {
		throw `versionBump should be one of ${versionBumpOptions}`;
	}

	let currentVersion = getCurrentVersion().split('.');
	let major = Number(currentVersion[0]);
	let minor = Number(currentVersion[1]);
	let patch = Number(currentVersion[2]);

	return {
		major: `${major + 1}.0.0`,
		minor: `${major}.${minor + 1}.0`,
		patch: `${major}.${minor}.${patch + 1}`,
	}[versionBump];
}

function getPackageJson() {
	return require(path.resolve(__dirname, '..', 'package.json'));
}

function parseXmlString(data) {
	return new Promise((resolve, reject) => {
		new xml2js.Parser().parseString(data, (err, data) => (err ? reject(err) : resolve(data)));
	});
}

function readFile(filepath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filepath, (err, data) => (err ? reject(err) : resolve(data)));
	});
}

function rename(oldPath, newPath) {
	return new Promise((resolve, reject) => {
		fs.rename(oldPath, newPath, (err, data) => (err ? reject(err) : resolve(data)));
	});
}

function spawnPromise(command, args) {
	return new Promise((resolve, reject) => {
		let child = childProcess.spawn(command, args);

		child.stdout.on('data', data => process.stdout.write(data));
		child.stderr.on('data', data => process.stderr.write(data));

		child.on('close', code => (code === 0 ? resolve(code) : reject(code)));
	});
}

function writeFile(filepath, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filepath, data, (err, data) => (err ? reject(err) : resolve(data)));
	});
}

module.exports = {
	bumpVersion,
	convertJsonToXml,
	convertJsonToYaml,
	convertYamlToJson,
	execFile,
	getCurrentVersion,
	getCurrentDockerImageTag,
	getDockerHubRepository,
	getNextVersion,
	getPackageJson,
	parseXmlString,
	readFile,
	rename,
	spawnPromise,
	writeFile,
};
