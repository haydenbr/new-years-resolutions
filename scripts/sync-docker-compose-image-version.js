const path = require('path');
const util = require('./script-utilities');

module.exports = versionTag => {
	let dockerComposePath = path.resolve(__dirname, '..', 'docker-compose.yml');
	let version = versionTag || util.getCurrentVersion();

	return util
		.readFile(dockerComposePath)
		.then(dockerCompose => util.convertYamlToJson(dockerCompose))
		.then(dockerComposeConfig => {
			let oldImageName = dockerComposeConfig.services['new-years-dev'].image;
			let newImageName = oldImageName.split(':')[0] + ':' + version;

			dockerComposeConfig.services['new-years-dev'].image = newImageName;

			return util.convertJsonToYaml(dockerComposeConfig);
		})
		.then(updatedDockerCompose => util.writeFile(dockerComposePath, updatedDockerCompose))
		.then(() => console.log(`updated docker compose image version to ${version}`));
};
