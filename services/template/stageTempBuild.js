/**
 * Created by zyg on 16/10/17.
 */
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var pixiLib = require('pixi-lib');

var format = require('string-template')

//文件名
var filename = 'sceneStage.js';

var tempEjsPath = path.resolve(__dirname,'./files/sceneStage.ejs');

var tempScripts = ejs.compile(fs.readFileSync(tempEjsPath).toString(),{
  escape(str){
    return str;
  }
});

var spriteSceneTemplate = require('./spriteSceneTemplate');

/**
 * @param viewData
 * @returns {{png: [str], json: [str]}}
 */
function getResoourceScripts(viewData) {
  const SPRITE_MC = pixiLib.types.SPRITE_MC;
  const SPRITE_MC_ALIAS = pixiLib.types.SPRITE_MC_ALIAS;
  const SPRITE_SP = pixiLib.types.SPRITE_SP;
  const SPRITE_IM = pixiLib.types.SPRITE_IM;
  const SPRITE_IM_ALIAS = pixiLib.types.SPRITE_IM_ALIAS;

  var resourceMap = {
    [SPRITE_IM]:[],
    [SPRITE_MC]:[]
  };

  resourceMap[SPRITE_IM_ALIAS] = resourceMap[SPRITE_IM];

  resourceMap[SPRITE_MC_ALIAS] =
    resourceMap[SPRITE_SP] =
      resourceMap[SPRITE_MC];

  viewData.forEach(layout=>{
    layout.children.forEach(sprite=>{

      resourceMap[sprite.type].push(sprite.name);
    })
  });


  var finalResource = {
    png:resourceMap[SPRITE_MC],
    json:resourceMap[SPRITE_IM],
  };
  
  return finalResource;
}

/**
 *
 * @param name
 * @param sprites
 *    [[],[]]
 * @returns {*}
 */
function temp(name,viewData) {


  var resourceScripts = JSON.stringify(getResoourceScripts(viewData),null,2);

  var sceneSpritesScripts = spriteSceneTemplate(viewData).text;

  var stageScript = tempScripts({
    sceneTitle:name,
    moduleVariablesName:spriteSceneTemplate.moduleVariablesName,
    sceneSpritesScripts,
    resources:resourceScripts,
  });

  fs.writeFileSync('test.js',stageScript);

  return stageScript
};


function build(sceneData) {

  var spriteScriptsString = temp(
    sceneData.sceneTitle,
    sceneData.viewData
  );

  
  
  return {
    filename,
    text:spriteScriptsString
  };
}

build.filename = filename;

module.exports = build;