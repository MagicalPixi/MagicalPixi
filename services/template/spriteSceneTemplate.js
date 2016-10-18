/**
 * Created by zyg on 16/10/16.
 */

/**
 * Created by zyg on 16/1/14.
 */
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

var utils =  require('../utils');

var pixiLib = require('pixi-lib');

const SPRITE_MC = pixiLib.types.SPRITE_MC;
const SPRITE_SP = pixiLib.types.SPRITE_SP;
const SPRITE_IM = pixiLib.types.SPRITE_IM;

//变量集合变量名字
var moduleVariablesName = 'moduleSprites';
//文件名
var filename = 'sceneSprite.js';

var tempEjsPath = path.resolve(__dirname,'../files/sceneSprite.ejs');

var tempScripts = ejs.compile(fs.readFileSync(tempEjsPath).toString(),{
  escape(str){
    return str;
  }
});
var spriteConfigScriptsTemplate  = require('./spriteConfigScriptsTemplate');

/**
 *
 * @param name
 * @param sprites
 *    [[],[]]
 * @returns {*}
 */
var temp = function (sprites) {

  var multiContainerScripts = sprites.map((children,i)=>{

    //无意义计数
    var name = `layout${i}`;

    var tempScriptsStr = tempScripts({
      name,
      moduleVariablesName,
      sprites:children,
    });

    return tempScriptsStr;
  });
  

  return multiContainerScripts.join('\n');
};

/**
 * 提前转化字符串
 * @param viewData
 * @returns {*}
 */
function trannsformViewData(viewData) {
  return viewData.map(containerOne=>{
    return containerOne.children.map(function (childObj) {

      var properties = childObj.properties;

      if(typeof properties === 'string'){
        try{
          properties = JSON.parse(properties)
        }catch (e){
          properties = {};
        }
      }

      return spriteConfigScriptsTemplate(
        childObj.name,
        childObj.type,
        properties,
        childObj.actionFrames
      ).text;
    });
  });
}


function build(viewData) {


  var spriteScriptsString = temp(
    trannsformViewData(viewData)
  );

  return {
    filename,
    text:spriteScriptsString
  };
}

build.filename = filename;
build.moduleVariablesName = moduleVariablesName;

module.exports = build;