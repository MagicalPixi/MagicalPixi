/**
 * Created by zyg on 16/10/17.
 */
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

var format = require('string-template')

//文件名
var filename = 'sceneStage.js';

var tempEjsPath = path.resolve(__dirname,'../files/sceneStage.ejs');

var tempScripts = ejs.compile(fs.readFileSync(tempEjsPath).toString(),{
  escape(str){
    return str;
  }
});

var spriteSceneTemplate = require('./spriteSceneTemplate');
/**
 *
 * @param name
 * @param sprites
 *    [[],[]]
 * @returns {*}
 */
var temp = function (name,viewData) {
  
  var sceneSpritesScripts = spriteSceneTemplate(viewData).text;

  sceneSpritesScripts = sceneSpritesScripts.replace(/\\'/g,"'");
  
  var stageScript = tempScripts({
    sceneTitle:name,
    moduleVariablesName:spriteSceneTemplate.moduleVariablesName,
  });

  stageScript = format(stageScript,{
    sceneSpritesScripts
  });

  return stageScript
};


function build(sceneData) {

  var spriteScriptsString = temp(
    sceneData.sceneTitle,
    sceneData.viewData
  )

  return {
    filename,
    text:spriteScriptsString
  };
}

build.filename = filename;

module.exports = build;