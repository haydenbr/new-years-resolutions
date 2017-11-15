#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const packageJson = require('../package.json');

var newVersion = packageJson.version;

// update bitbucket-pipelines.yml with new image tag
var pipelinesYamlPath = path.resolve(__dirname, '../', 'bitbucket-pipelines.yml');
var yamlString = fs.readFileSync(pipelinesYamlPath, 'utf-8');
var yamlObject = yaml.load(yamlString);
var imageName = yamlObject.image;
var newImageName = imageName.split(':')[0] + ':' + newVersion;

yamlObject.image = newImageName;

var newYamlString = yaml.dump(yamlObject);

fs.writeFileSync(pipelinesYamlPath, newYamlString);
