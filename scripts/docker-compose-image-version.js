const path = require('path');
const util = require('./script-utilities');

function syncLatestVersionNumber() {
	let dockerComposePath = path.resolve(__dirname, '..', 'docker-compose.yml');
	let version = util.getCurrentVersion();

	return util
		.readFile(dockerComposePath)
		.then(dockerCompose => util.convertYamlToJson(dockerCompose))
		.then(dockerComposeConfig => {
			let oldImageName = dockerComposeConfig.services['new-years-dev'].image;
			let newImageName = oldImageName.split(':')[0] + ':' + version;

			dockerComposeConfig.services['new-years-dev'].image = newImageName;
			dockerComposeConfig.services['new-years-dev'].build = undefined;

			return util.convertJsonToYaml(dockerComposeConfig);
		})
		.then(updatedDockerCompose => util.writeFile(dockerComposePath, updatedDockerCompose))
		.then(() => console.log(`updated docker compose image version to ${version}`));
}

module.exports = {
	syncLatestVersionNumber,
};
