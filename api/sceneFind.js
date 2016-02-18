/**
 * Created by zyg on 16/2/17.
 */
var ObjectId = require('mongodb').ObjectID;
var Scene = require('../models/Scene');

module.exports = function find(req, res) {

  var id = Number(req.query.id);

  var result = false;

  if (!isNaN(id)) {

    //获取全部
    if(id === 0){

      Scene.find({}).then(function (findCursor) {

        findCursor.toArray(function (err,scenes) {

          if(err){
            res.json({
              err
            })
          }else{

            res.json({
              result:scenes
            })
          }
        })
      })

    }else{

      Scene.findOne({
        _id: ObjectId(id)
      }).then(function (r) {
        result = r;

        res.json({
          result
        })
      }).catch(function (err) {
        console.log(err)

        res.json({
          err
        })
      })
    }
  } else {
    res.json({
      result
    })
  }
};