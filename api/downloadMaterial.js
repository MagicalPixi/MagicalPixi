/**
 * Created by zyg on 16/1/13.
 */
var path = require('path');
var ObjectId = require('mongodb').ObjectID;

var MaterialZip = require('../models/MaterialZip');

//GET0
module.exports = function (req, res,next) {
  var name = req.query.name;
  var id = req.query.id;

  MaterialZip.findOne({
    name
  }).then(function (result) {

    if(result){
      res.download(
        result.zipPath,
        name+'.zip'
      );
    }else{
      res.json({
        error:`${name} not found`
      });
    }
  }).catch(function (err) {

    console.log('materialZip findOne error:',err);

    next(err);
  });
};