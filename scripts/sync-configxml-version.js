#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

var rootdir = path.resolve(__dirname, '../');

var package = require(rootdir + '/package.json').version;

var parser = new xml2js.Parser();
fs.readFile(rootdir + '/config.xml', function(err, data) {
  parser.parseString(data, function (err, result) {
      if(err) console.log(err);
        // here we log the results of our xml string conversion

        var json = result;

        json.widget.$.version = package;

        // create a new builder object and then convert
        // our json back to xml.
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(json);

        fs.writeFile(rootdir + '/config.xml', xml, function(err, data){
            if (err) console.log(err);

            console.log("successfully written our update xml to file");
        });
  });
});
