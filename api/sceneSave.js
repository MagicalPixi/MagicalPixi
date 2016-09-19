/**
 * Created by zyg on 16/2/17.
 */
var ObjectId = require('mongodb').ObjectID;
var Scene = require('../models/Scene');

module.exports = function (req,res) {

  var id = req.body.id;
  var sceneTitle = req.body.sceneTitle;
  var viewData = req.body.viewData;

  console.log(id,sceneTitle,viewData);

  Scene.save({
    id,
    sceneTitle,
    viewData
  }).then(function (result) {

    console.log('save result:',result);

    res.json({
      result:result.ops[0]._id
    })
  }).catch(function (err) {
    console.log(err)
    res.json({err})
  })
}