const { spawn } = require('child_process');
const path = require('path');

const revHash = require('rev-hash');

function getLocalPackageJson() {
  return require('../package.json');
}

function getLocalPackageJsonHash() {
  return revHash(JSON.stringify(getLocalPackageJson()));
}

function utfFromBuffer(buf) {
  return new Buffer(buf, 'utf-8').toString('utf-8').trim();
}

function getContainerPackageJson() {
  return new Promise((resolve, reject) => {
    let dockerCheck = spawn('./docker-dependency-check.sh', []);
    let containerId = '';
    let jsonString = '';

    dockerCheck.stderr.on('data', (data) => reject(utfFromBuffer(data)));

    dockerCheck.stdout.on('data', (data) => {
      let dataString = utfFromBuffer(data);

      if (!containerId) {
        containerId = dataString;
      }
      else {
        jsonString += dataString;
      }
    });

    dockerCheck.on('close', () => {
      try {
        resolve(JSON.parse(jsonString));
      }
      catch (e) {
        reject(e);
      }
    });
  });
}

function dockerDependencyCheck() {
  return getContainerPackageJson()
    .then(packageJson => JSON.stringify(packageJson))
    .then(jsonString => revHash(jsonString))
    .then(containerHash => containerHash === getLocalPackageJsonHash());
}

module.exports = dockerDependencyCheck;
