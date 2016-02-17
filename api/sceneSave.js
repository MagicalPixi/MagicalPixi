/**
 * Created by zyg on 16/2/17.
 */
var ObjectId = require('mongodb').ObjectID;
var Scene = require('../models/Scene');

module.exports = function (req,res) {

  var id = req.body.id;
  var viewData = req.body.viewData;

  Scene.save({
    id,
    viewData
  }).then(function (result) {

    res.json({
      result
    })
  })
}