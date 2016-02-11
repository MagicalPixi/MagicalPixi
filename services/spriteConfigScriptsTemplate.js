/**
 * Created by zyg on 16/1/14.
 */
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

var _ = require('lodash');



var pixiLibName = 'pixi-lib';

var filename = 'sprite.js';

var tempEjsPath = path.resolve(__dirname,'./files/tempSpriteScript.ejs');

var tempScripts = ejs.compile(fs.readFileSync(tempEjsPath).toString());

var spriteTypeFn  = function (type) {
  var map = {
    'image':'getIm',
    'movieClip':'getMc'
  };

  return map[type];
};

var temp = function (name,fnStr,properties) {

  var referenceName = 'lib';


  //var tempScriptsStr = `var ${referenceName} = require('${pixiLibName}'); \n` +
  //  `var mySprite = ${referenceName}.${fnStr}({ \n` +
  //  `textures:${referenceName}.getTextures('${name}'),\n` +
  //  propertiesStr +
  //  `}); \n` +
  //  `module.exports = mySprite; \n`;

  var tempScriptsStr = tempScripts({
    referenceName,
    pixiLibName,
    name,
    fnStr,
    properties
  });

  return tempScriptsStr;
};


function build(name,spriteType,properties) {
  var propertiesStr = _.map(Object.keys(properties), function (key) {
    return "'" + key + "':" + properties[key] + ', \n';
  }).join('');

  var spriteScriptsString = temp(
    name,
    spriteTypeFn(spriteType),
    properties
  );

  return {
    filename,
    text:spriteScriptsString
  };
};

build.filename = filename;

module.exports = build;