#!/usr/bin/env node

process.env.PREVIOUS_VERSION = '0.0.2'

const dockerDependencyCheck = require('./docker-dependency-check.js');

dockerDependencyCheck().then(console.log);
