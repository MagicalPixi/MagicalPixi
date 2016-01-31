/**
 * Created by zyg on 16/1/14.
 */
var _ = require('lodash');

var pixiLibName = 'pixi-lib';

var filename = 'sprite.js';

var spriteTypeFn  = function (type) {
  var map = {
    'image':'sprite.getIm',
    'movieClip':'sprite.getMc'
  };

  return map[type];
};

var temp = function (fnStr,propertiesStr) {

  var tempScripts = "var sprite = require('"+pixiLibName+"'); \n" +
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

build.filename = filename;

module.exports = build