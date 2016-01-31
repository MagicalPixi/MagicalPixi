/**
 * Created by zyg on 16/1/14.
 */
var _ = require('lodash');

var filename = 'index.js';

var configFilename = require('./spriteConfigScriptsTemplate').configFilename;

var temp = function (spriteFilename) {

  var tempScripts = "var mySprite = require('./"+spriteFilename+"'); \n" +
    "mySprite.render = function () { }\n" +
    "module.exports = mySprite; \n";

  return tempScripts;
};


function build() {

  return {
    filename,
    text:temp(configFilename)
  }
};

build.filename = filename;

module.exports = build;