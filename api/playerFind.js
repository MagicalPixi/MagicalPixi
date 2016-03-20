'use strict'

var Player = require('../models/Player');

module.exports = function (req,res) {


  Player.find({}).then(function (findCursor) {

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