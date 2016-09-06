/**
 * Created by zyg on 16/9/6.
 */
var ObjectId = require('mongodb').ObjectId;

var Sprite = require('../models/Sprite');

module.exports = function (req, res,next) {


  var id = req.body.id;
  var toDirectory = req.body.toDirectory;


  if(id && toDirectory){

    Sprite.save({
      id,
      directory:toDirectory
    },true).then(r=>{

      res.json({
        success:true,
        data:r,
      });

    }).catch(e=>{

      next(e)
    });

  }else {

    next(new Error('参数缺失'));
  }
};