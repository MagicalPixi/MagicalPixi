'use strict'

var Basic = require('../models/Basic');

module.exports = function (req,res,next) {

  var _id = req.body._id;
  var name = req.body.name;

  var query;
  if(_id){
    query = {_id};
  }else if(name){
    query = {name}
  }

  if(!query){
    return next(new Error('basicDelete has no _id or name'));
  }

  Basic.deleteOne(query).then(function (findCursor) {

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