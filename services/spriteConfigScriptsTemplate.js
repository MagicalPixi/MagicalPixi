/**
 * Created by zyg on 16/1/14.
 */
var _ = require('lodash');

var filename = 'sprite.js';

var spriteTypeFn  = function (type) {
  var map = {
    'image':'sprite.getIm',
    'movieClip':'sprite.getMc'
  };

  return map[type];
};

var temp = function (fnStr,propertiesStr) {

  var tempScripts = "var sprite = require('pixi-sprite'); \n" +
    "var mySprite = " + fnStr + "({\n" +
    "maxFrame:null,\n" +
    "preFix:null, \n" +
    propertiesStr +
    "}); \n" +
    "module.exports = mySprite; \n";

  return tempScripts;
};


function build(spriteType,properties) {
  var propertiesStr = _.map(Object.keys(properties), function (key) {
    return "'" + key + "':" + properties[key] + ', \n';
  }).join('');

  var spriteScriptsString = temp(
    spriteTypeFn(spriteType),
    propertiesStr
  );

  return {
    filename,
    text:spriteScriptsString
  };
};

build.configFilename = filename;

module.exports = build