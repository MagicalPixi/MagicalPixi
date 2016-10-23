/**
 * Created by zyg on 16/1/14.
 */
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

var utils = require('../utils');

var _ = require('lodash');

var filename = 'sprite.js';

var tempEjsPath = path.resolve(__dirname,'./files/tempSpriteScript.ejs');

var tempScripts = ejs.compile(fs.readFileSync(tempEjsPath).toString(),{
  escape(str){
    return str;
  }
});

var temp = function (name,fnStr,properties,actionFrames) {

  var pixiLibName = 'pixi-lib';
  var referenceName = 'pixiLib';
  
  if(typeof properties === 'string'){
    throw new Error('properties is a string');
  }

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

  console.log('properties:',typeof properties,properties);

  var spriteScriptsString = temp(
    name,
    utils.spriteTypeFn(spriteType),
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