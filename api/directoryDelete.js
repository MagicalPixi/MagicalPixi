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

  var Directory = directoryMap(type);

  var query;
  if(_id){
    query = {_id:ObjectId(_id)};
  }else if(name){
    query = {name};
  }

  if(!query){
    return next('no id or name')
  }

  Directory.deleteOne(query).then(deleteResult=>{
    res.json({
      result:deleteResult
    })
  }).catch(err=>{
    console.log(err);
    res.json({err});
  });
};