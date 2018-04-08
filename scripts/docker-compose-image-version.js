const path = require('path');
const util = require('./script-utilities');
const dockerComposePath = path.resolve(__dirname, '..', 'docker-compose.yml');

function setComposeLatestImage() {
	const version = 'latest';

	return getComposeData().then(dockerComposeConfig => {
		dockerComposeConfig.services['new-years-dev'].image = getUpdatedImageTag(version);
		dockerComposeConfig.services['new-years-dev'].build = '.';
		return saveComposeData(dockerComposeConfig, version);
	});
}

function syncComposeImageVersion() {
	const version = util.getCurrentVersion();

	return getComposeData().then(dockerComposeConfig => {
		dockerComposeConfig.services['new-years-dev'].image = getUpdatedImageTag(version);
		delete dockerComposeConfig.services['new-years-dev'].build;
		return saveComposeData(dockerComposeConfig, version);
	});
}

function getComposeData() {
	return util.readFile(dockerComposePath).then(dockerCompose => util.convertYamlToJson(dockerCompose));
}

function getUpdatedImageTag(version) {
	return util.getDockerHubRepository() + ':' + version;
}

function saveComposeData(updatedComposeData, version) {
	let composeData = util.convertJsonToYaml(updatedComposeData);
	return util
		.writeFile(dockerComposePath, composeData)
		.then(() => console.log(`updated docker compose image version to ${version}`));
}

module.exports = {
	setComposeLatestImage,
	syncComposeImageVersion,
};
