#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const revHash = require('rev-hash');
const util = require('./script-utilities');

let wwwRootDir = path.resolve(__dirname, '..', 'www');

function hashFile(fileName, fileExtension) {
	let buildDir = path.join(wwwRootDir, 'build');
	let filePath = path.join(buildDir, `${fileName}.${fileExtension}`);
	let fileRefSelector = '';
	let attr = '';
	let newFileName = '';

	if (fileExtension === 'js') {
		attr = 'src';
		fileRefSelector = `body script[${attr}="build/${fileName}.js"]`;
	} else {
		attr = 'href';
		fileRefSelector = `head link[${attr}="build/${fileName}.css"]`;
	}

	return util
		.readFile(filePath)
		.then(data => revHash(data))
		.then(hash => (newFileName = `${fileName}.${hash}.${fileExtension}`))
		.then(() => util.rename(filePath, path.join(buildDir, newFileName)))
		.then(() => Object.assign({ fileRefSelector, attr, newFileName }));
}

function bustTheCache() {
	let indexPath = path.join(wwwRootDir, 'index.html');
	let $;

	return util
		.readFile(indexPath)
		.then(data => ($ = cheerio.load(data)))
		.then(() => Promise.all([hashFile('main', 'css'), hashFile('main', 'js'), hashFile('vendor', 'js')]))
		.then(newFileNames => newFileNames.forEach(data => $(data.fileRefSelector).attr(data.attr, data.newFileName)))
		.then(() => util.writeFile(indexPath, $.html()));
}

bustTheCache();
