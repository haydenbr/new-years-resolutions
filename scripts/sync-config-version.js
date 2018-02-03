const path = require('path');
const util = require('./script-utilities');

module.exports = () => {
	let configXmlFilepath = path.resolve(__dirname, '..', 'config.xml');
	let version = util.getCurrentVersion();

	return util
		.readFile(configXmlFilepath)
		.then(data => util.parseXmlString(data))
		.then(xmlJson => {
			xmlJson.widget.$.version = version;

			return util.convertJsonToXml(xmlJson);
		})
		.then(xml => util.writeFile(configXmlFilepath, xml))
		.then(() => console.log(`updated config.xml to version ${version}`))
		.catch(err => {
			console.log(err);
			process.exit(1);
		});
};
