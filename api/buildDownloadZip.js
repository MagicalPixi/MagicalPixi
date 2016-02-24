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
    condition = { name };
  }

  console.log('condition:',condition);

  if(!condition){
    return next(new Error('no id or name'));
  }

  Sprite.findOne(condition).then(function (result) {

    if(result){

      buildMaterialZipSource(result).then(function (sourceObj) {

        console.log('build source done');

        archiverZip(result.name+'.zip',sourceObj).then(function (zipPath) {

          console.log('archiveZip done:',zipPath);

          res.download(
            zipPath,
            result.name+'.zip'
          );
        });
      });
    }else{
      next(new Error('not found by condition:'+JSON.stringify(condition)));
    }
  });

};