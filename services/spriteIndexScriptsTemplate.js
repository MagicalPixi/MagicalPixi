/**
 * Created by zyg on 16/1/14.
 */
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

var _ = require('lodash');

var filename = 'index.js';

var configFilename = require('./spriteConfigScriptsTemplate').filename;

var tempEjsPath = path.resolve(__dirname,'./files/tempIndexScript.ejs');

var tempIndex = ejs.compile(fs.readFileSync(tempEjsPath).toString());

var temp = function (spriteFilename) {

  var tempIndexStr = tempIndex({
    spriteFilename
  })

  return tempIndexStr;
};


function build() {

  return {
    filename,
    text:temp(configFilename)
  }
};

build.filename = filename;

module.exports = build;