#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const dockerDependencyCheck = require('./docker-dependency-check.js');
const getCurrentVersion = require('./get-current-version.js');

const dockerBuildScript = path.resolve(__dirname, 'docker-build.sh');
const dockerTagScript = path.resolve(__dirname, 'docker-tag.sh');

const version = getCurrentVersion();

function utfFromBuffer(buf) {
  return new Buffer(buf, 'utf-8').toString('utf-8').trim();
}

function execScript(script) {
  return new Promise((resolve, reject) => {
    let child = spawn('sh', [ script ]);

    child.stderr.on('data', (data) => reject(utfFromBuffer(data)));

    child.stdout.on('data', (data) => console.log(utfFromBuffer(data)));

    child.on('close', (code, status) => {
      if (code === 0) {
        resolve();
      }
      else {
        reject({ code, status });
      }
    });
  });
}

function dockerBuild() {
  console.log(`Change in dependencies detected. Builing new image tagged with version ${version}`);
  return execScript(dockerBuildScript);
}

function dockerTag() {
  console.log(`No change in dependencies detected. Tagging previous image with version ${version}`);
  return execScript(dockerTagScript);
}

dockerDependencyCheck()
  .then(hasChanges => (hasChanges) ? dockerBuild() : dockerTag())
  .catch(err => console.error(`error: ${err}`));
