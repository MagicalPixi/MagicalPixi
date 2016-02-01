/**
 * Created by zyg on 16/1/14.
 */
var _ = require('lodash');

var pixiLibName = 'pixi-lib';

var filename = 'sprite.js';

var spriteTypeFn  = function (type) {
  var map = {
    'image':'getIm',
    'movieClip':'getMc'
  };

  return map[type];
};

var temp = function (name,fnStr,propertiesStr) {

  var referenceName = 'lib';
  
  var tempScripts = `var ${referenceName} = require('${pixiLibName}'); \n` +
    `var mySprite = ${referenceName}.${fnStr}({ \n` +
    `textures:${referenceName}.getTextures('${name}'),\n` +
    propertiesStr +
    `}); \n` +
    `module.exports = mySprite; \n`;

  return tempScripts;
};


function build(name,spriteType,properties) {
  var propertiesStr = _.map(Object.keys(properties), function (key) {
    return "'" + key + "':" + properties[key] + ', \n';
  }).join('');

  var spriteScriptsString = temp(
    name,
    spriteTypeFn(spriteType),
    propertiesStr
  );

  return {
    filename,
    text:spriteScriptsString
  };
};

build.filename = filename;

module.exports = build;