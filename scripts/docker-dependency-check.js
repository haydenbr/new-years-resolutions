const { spawn } = require('child_process');
const path = require('path');
const revHash = require('rev-hash');
const packageJson = require('../package.json');

const dockerScript = path.resolve(__dirname, 'docker-dependency-check.sh');

function utfFromBuffer(buf) {
  return new Buffer(buf, 'utf-8').toString('utf-8').trim();
}

function getContainerPackageJson() {
  return new Promise((resolve, reject) => {
    let dockerCheck = spawn('sh', [ dockerScript ]);
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
  let containerPackageJson = {};

  return getContainerPackageJson()
    .then(packageJson => {
      containerPackageJson = packageJson;

      let containerDepsHash = revHash(JSON.stringify(containerPackageJson.dependencies));
      let containerDevDepsHash = revHash(JSON.stringify(containerPackageJson.devDependencies));
      let localDepsHash = revHash(JSON.stringify(packageJson.dependencies));
      let localDevDepsHash = revHash(JSON.stringify(packageJson.devDependencies));

      return containerDepsHash !== localDepsHash || containerDevDepsHash !== localDevDepsHash;
    });
}

module.exports = dockerDependencyCheck;
