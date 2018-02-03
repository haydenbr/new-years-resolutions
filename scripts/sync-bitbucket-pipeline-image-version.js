const path = require('path');
const util = require('./script-utilities');

module.exports = () => {
	let pipelinesFilepath = path.resolve(__dirname, '..', 'bitbucket-pipelines.yml');
	let version = util.getCurrentVersion();

	return util
		.readFile(pipelinesFilepath)
		.then(pipeline => util.convertYamlToJson(pipeline))
		.then(pipelineObject => {
			let oldImageName = pipelineObject.image.name || pipelineObject.image;
			let newImageName = oldImageName.split(':')[0] + ':' + version;

			if (pipelineObject.image.name) {
				pipelineObject.image.name = newImageName;
			} else {
				pipelineObject.image = newImageName;
			}

			return util.convertJsonToYaml(pipelineObject);
		})
		.then(updatedPipeline => util.writeFile(pipelinesFilepath, updatedPipeline))
		.then(() => console.log(`updated bitbucket pipelines image version to ${version}`));
};
