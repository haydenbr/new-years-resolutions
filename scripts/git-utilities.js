const childProcess = require('child_process');
const util = require('./script-utilities');

function commit(message) {
	return util.execFile('git', ['commit', '-a', '-m', message]);
}

function existsTag(tag) {
	return util.execFile('git', ['ls-remote', 'origin', `refs/tags/${tag}`]).then(data => !!data);
}

function push() {
	return util.spawnPromise('git', ['push']);
}

function pushTag(tagName) {
	return util.spawnPromise('git', ['push', 'origin', tagName]);
}

function tag(tagName) {
	return util.execFile('git', ['tag', tagName]);
}

module.exports = {
	commit,
	existsTag,
	push,
	pushTag,
	tag,
};
