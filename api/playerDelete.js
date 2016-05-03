'use strict'

var Player = require('../models/Player');

module.exports = function (req,res) {

  var _id = req.body._id;
  var name = req.body.name;

  var query;
  if(_id){
    query = {_id};
  }else if(name){
    query = {name}
  }

  Player.deleteOne(query).then(function (findCursor) {

    findCursor.toArray(function (err, players) {

      if(err){
        res.json({err});
      }else{
        res.json({
          result:players
        });
      }
    });
  });
};