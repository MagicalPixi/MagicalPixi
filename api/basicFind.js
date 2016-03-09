'use strict'

var Basic = require('../models/Basic');

module.exports = function (req,res) {


  Basic.find({}).then(function (findCursor) {

    findCursor.toArray(function (err, basics) {

      if(err){
        res.json({err});
      }else{
        res.json({
          result:basics
        });
      }
    });
  });
};