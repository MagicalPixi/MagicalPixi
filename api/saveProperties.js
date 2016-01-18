/**
 * Created by zyg on 16/1/11.
 */
var Sprite = require('../models/Sprite');

var buildMaterialZipSource = require('../services/buildMaterialZipSource');

var archiverZip = require('../services/archiverDownloadZip');

var MaterialZip = require('../models/MaterialZip');

module.exports = function (req, res) {

  var id = req.body.id;
  var type = req.body.spriteType;
  var name = req.body.spriteName;
  var resourceUrl = req.body.resourceUrl;
  var properties = req.body.properties;

  var userFlag = req.session.userFlag;

  //console.log(typeof properties,properties);

  var materialObj = {
    id,
    resourceUrl,
    userFlag,
    type,
    name,
    properties
  };

  console.log('materialObj:',materialObj);

  //存入素材
  Sprite.save(materialObj).then(function(result){

    res.json({result});

  }).catch(function (err) {
    console.log('err',err);
    res.json({err})
  });


  //@TODO 生成zip的逻辑，待优化
  console.log('生成sourceObj');
  //同时，生成一个zip包
  buildMaterialZipSource(materialObj).then(function (sourceObj) {

    archiverZip(name+'.zip',sourceObj).then(function (zipPath) {

      //存储zip包和素材名字至数据库
      MaterialZip.insertOne({
        zipPath,
        name
      }).then(function (result) {
        console.log('MaterialZip.insertOne:',result.result);
      })
    });
  });
};