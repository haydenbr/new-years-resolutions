const util = require('./script-utilities');

function build() {
	let repo = util.getDockerHubRepository();
	let version = util.getCurrentVersion();
	let repoTag = `${repo}:${version}`;

	return util.spawnPromise('docker', ['build', '-t', repoTag, '.']);
}

function push() {
	let repo = util.getDockerHubRepository();
	let version = util.getCurrentVersion();
	let repoTag = `${repo}:${version}`;

	return util.spawnPromise('docker', ['push', repoTag]);
}

module.exports = {
	build,
	push,
};
