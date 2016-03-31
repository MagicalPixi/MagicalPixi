/**
 * Created by zyg on 16/1/31.
 */
var ObjectId = require('mongodb').ObjectID;

var Sprite = require('../models/Sprite');

var buildMaterialZipSource = require('../services/buildMaterialZipSource');

var archiverZip = require('../services/archiverDownloadZip');

var MaterialZip = require('../models/MaterialZip');

module.exports = function (req, res,next) {

  var id = req.query.id;
  var name = req.query.name;

  var condition = null;

  if(id){
    condition = {
      _id:ObjectId(id)
    };
  }else if(name){
    condition = {
      name
    };
  }

  console.log('condition:',condition);

  if(!condition){
    return next(new Error('no id or name'));
  }

  Sprite.findOne(condition).then(function (result) {
    name = result.name;
    console.log('sprite:',result);

    return buildMaterialZipSource(result);
  }).then(function (sourceObj) {

    console.log('build source done');

    return archiverZip(name + '.zip', sourceObj);
  }).then(function (zipPath) {
    console.log('archiveZip done:', zipPath);

    res.download(
      zipPath,
      name + '.zip'
    );
  },function () {
    throw new Error('not found by condition:'+JSON.stringify(condition));
  }).catch(function (e) {
    next(e);
  });
};