/**
 * Created by zyg on 16/2/17.
 */
var ObjectId = require('mongodb').ObjectID;
var Scene = require('../models/Scene');

module.exports = function (req,res) {

  var id = req.body.id;
  var name = req.body.name;
  var viewData = req.body.viewData;

  console.log(id,viewData);

  Scene.save({
    id,
    name,
    viewData
  }).then(function (result) {

    console.log('save result:',result);

    res.json({
      result
    })
  }).catch(function (err) {
    console.log(err)
    res.json({err})
  })
}