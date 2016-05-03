'use strict'
var ObjectId = require('mongodb').ObjectID;
var Basic = require('../models/Basic');

module.exports = function (req,res,next) {

  var _id = req.body._id;
  var name = req.body.name;

  var query;
  if(_id){
    query = {
      _id:ObjectId(_id)
    };
  }else if(name){
    query = {name}
  }

  if(!query){
    return next(new Error('basicDelete has no _id or name'));
  }

  Basic.deleteOne(query).then(function (basics) {

    res.json({
      result: basics
    });

  }).catch(err=>{
    console.log('basicDelete:',err);
    res.json({err});
  });
};