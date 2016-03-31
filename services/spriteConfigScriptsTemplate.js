/**
 * Created by zyg on 16/1/14.
 */
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

var pixiLib = require('pixi-lib');

var SPRITE_MC = pixiLib.types.SPRITE_MC;
var SPRITE_SP = pixiLib.types.SPRITE_SP;
var SPRITE_IM = pixiLib.types.SPRITE_IM;

var _ = require('lodash');

var filename = 'sprite.js';

var tempEjsPath = path.resolve(__dirname,'./files/tempSpriteScript.ejs');

var tempScripts = ejs.compile(fs.readFileSync(tempEjsPath).toString());

var spriteTypeFn  = function (type) {
  var map = {
    'image':'getIm',
    'movieClip':'getMc',
    [SPRITE_IM]:'getIm',
    [SPRITE_MC]:'getMc',
    [SPRITE_SP]:'getSp',
  };

  return map[type];
};

var temp = function (name,fnStr,properties,actionFrames) {

  var pixiLibName = 'pixi-lib';
  var referenceName = 'pixiLib';

  var tempScriptsStr = tempScripts({
    referenceName,
    pixiLibName,
    name,
    fnStr,
    properties,
    actionFrames,
  });

  return tempScriptsStr;
};


function build(name,spriteType,properties,actionFrames) {
  var propertiesStr = Object.keys(properties).map(function (key) {
    return `"${key}":"${properties[key]}", \n`;
  }).join('');

  var spriteScriptsString = temp(
    name,
    spriteTypeFn(spriteType),
    properties,
    actionFrames
  );

  return {
    filename,
    text:spriteScriptsString
  };
}

build.filename = filename;

module.exports = build;