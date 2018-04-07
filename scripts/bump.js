#!/usr/bin/env node

const chalk = require('chalk');
const copyDependencies = require('./copy-dependencies');
const dockerUtil = require('./docker-utilities');
const gitUtil = require('./git-utilities');
const syncConfigXmlVersion = require('./sync-config-version');
const syncBitbucketPipelineImageVersion = require('./sync-bitbucket-pipeline-image-version');
const syncDockerComposeImageVersion = require('./docker-compose-image-version').syncLatestVersionNumber;
const util = require('./script-utilities');

function bump(versionBump) {
	return bumpVersion(versionBump)
		.then(() => syncVersionNumbers())
		.then(() => commitAndTag())
		.then(() => dockerize())
		.then(() => gitPush())
		.catch(err => console.log(chalk.red(err)));
}

function bumpVersion(versionBump) {
	let nextVersion = util.getNextVersion(versionBump);

	return gitUtil
		.existsTag(nextVersion)
		.then(exists => {
			if (exists) {
				throw `version ${nextVersion} already exists. Get your commit history in line with origin before version bumping`;
			}
		})
		.then(() => util.bumpVersion(versionBump));
}

function commitAndTag() {
	let version = util.getCurrentVersion();

	return gitUtil.commit(version).then(() => gitUtil.tag(version));
}

function dockerize() {
	return dockerUtil.build().then(() => dockerUtil.push());
}

function gitPush() {
	let tag = util.getCurrentVersion();

	return gitUtil.push().then(() => gitUtil.pushTag(tag));
}

function shouldBump() {}

function syncVersionNumbers() {
	return Promise.all([
		copyDependencies(),
		syncConfigXmlVersion(),
		syncBitbucketPipelineImageVersion(),
		syncDockerComposeImageVersion(),
	]);
}

const versionBump = process.argv[2];
bump(versionBump);
