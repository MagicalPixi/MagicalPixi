/**
 * Created by zyg on 16/1/16.
 */
var fs = require('fs');
var path = require('path');
var Sprite = require('../models/Sprite');

var configScriptsTemplate = require('./spriteConfigScriptsTemplate');
var indexScriptsTemplate = require('./spriteIndexScriptsTemplate');

var resourceObjBuild = function (name,resourceUrl) {
  var resourceObj = {};

  var p = path.parse(resourceUrl);

  //加入png
  resourceObj[`${name}.png`] = path.resolve(__dirname,'../public',`.${p.dir}`,`${p.name}.png`);

  if(p.ext === '.json'){

    var jsonObj = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../public',`.${p.dir}`,`${p.name}.json`)).toString());

    jsonObj.meta.image = `${name}.png`;

    resourceObj[`${name}.json`] = new Buffer(JSON.stringify(jsonObj));
  }

  console.log('resourceObj:',resourceObj);

  return resourceObj;
};

var build = function (materialObj) {

  var name = materialObj.name;

  var properties = materialObj.properties;
  if(typeof properties === 'string'){
    properties = JSON.parse(properties);
  }

  var actionFrames = materialObj.actionFrames;
  if(typeof actionFrames === 'string') {
    actionFrames = JSON.parse(actionFrames);
  }

  console.log('actionFrames:',actionFrames);

  var scripts = configScriptsTemplate(
    materialObj.name,
    materialObj.type,
    properties,
    actionFrames
  );

  var indexScripts = indexScriptsTemplate();

  //var resourceObj = resourceObjBuild(materialObj.resourceUrl);
  //
  //resourceObj = Object.assign(resourceObj,{
  //  [configScriptsTemplate.filename]:new Buffer(scripts.text),
  //  [indexScriptsTemplate.filename]:new Buffer(indexScripts.text)
  //});
  var scriptsFileResourceObj = {
    [configScriptsTemplate.filename]: new Buffer(scripts.text),
    [indexScriptsTemplate.filename]: new Buffer(indexScripts.text)
  };


  return scriptsFileResourceObj;
};

/**
 * @param materialObj
 *  name,
 *  type,
 *  resourceUrl,
 *  properties,
 *  actionFrames 动作帧数组，默认[]，只有SPRITE_SP类型的精灵有
 *  一个素材对象，同mongo的存储对象。
 */
module.exports = function buildMaterialZipSource(materialObj) {
  var name = materialObj.name;
  
  var isAllRequired = ['name','type','resourceUrl','properties'].every(function (key) {
    return materialObj[key];
  });

  materialObj.actionFrames = materialObj.actionFrames || '[]';

  return new Promise(function (resolve,reject) {
    if(!name){
      throw new Error('materialObj must have "name" ');
    }
    console.log('isAllRequired:',isAllRequired);

    if(isAllRequired){

      var scriptsFiles = build(materialObj);

      var resourceObj = resourceObjBuild(materialObj.name,materialObj.resourceUrl);

      resolve(Object.assign({},scriptsFiles,resourceObj));
    }else{
      reject(false);
    }
  })
};