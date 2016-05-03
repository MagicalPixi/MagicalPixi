/**
 * Created by zyg on 16/5/3.
 */
var ObjectId = require('mongodb').ObjectID;

var BasicDirectory = require('../models/BasicDirectory');
var PlayerDirectory = require('../models/PlayerDirectory');

function directoryMap(type){
  var map = {
    basic:BasicDirectory,
    player:PlayerDirectory
  };
  return map[type];
}

module.exports = function (req, res,next) {
  //新建文件夹类型，1.basic基本素材,2.player合成,3.sprite精灵
  var type = req.body.type;
  var _id  = req.body._id;
  var name = req.body.name;
  var parentName = req.body.parentName;

  var Directory = directoryMap(type);

  Directory.save({
    _id,
    name,
    parentName
  }).then((saveResult)=>{

    res.json({
      result:saveResult.ops[0]
    });

  }).catch(err=>{
    console.log(err);
    res.json({err});
  });
};