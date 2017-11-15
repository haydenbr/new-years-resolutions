const packageJson = require('../package.json');

function getCurrentVersion() {
  return packageJson.version;
}

module.exports = getCurrentVersion;
