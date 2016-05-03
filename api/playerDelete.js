'use strict'
var ObjectId = require('mongodb').ObjectID;
var Player = require('../models/Player');

module.exports = function (req,res) {

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

  Player.deleteOne(query).then(function (players) {

    res.json({
      result: players
    });

  }).catch(err=>{
    console.log(err);
    res.json({err});
  });
};