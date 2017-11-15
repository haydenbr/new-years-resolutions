#!/usr/bin/env node

process.env.PREVIOUS_VERSION = '1.1.5'

const dockerDependencyCheck = require('./docker-dependency-check.js');

dockerDependencyCheck().then(console.log);
