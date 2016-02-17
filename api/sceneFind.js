/**
 * Created by zyg on 16/2/17.
 */
var ObjectId = require('mongodb').ObjectID;
var Scene = require('../models/Scene');

module.exports = function find(req, res) {

  var id = req.query.id;

  var result = false;

  if (id) {
    Scene.findOne({
      id: ObjectId(id)
    }).then(function (r) {
      result = r;

      res.json({
        result
      })
    })
  } else {
    res.json({
      result
    })
  }
};