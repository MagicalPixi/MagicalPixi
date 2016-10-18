/**
 * Created by zyg on 16/10/12.
 */
var Scene = require('../models/Scene');
var ObjectId = require('mongodb').ObjectID;

var fs = require('fs')

var stageTempBuild = require('../services/template/stageTempBuild');

module.exports = function (req,res) {

  var id = req.query.id;

  console.log('output id:',id);

  Scene.findOne({
    _id:ObjectId(id)
  }).then(sceneData=>{

    sceneData.viewData = JSON.parse(sceneData.viewData);

    var s = stageTempBuild(sceneData);

    //@TEST
    fs.writeFileSync('test.js',s.text);


  }).catch(e=>{

    console.log('Scene.findOne:',e);
  });


  res.json({
    fuck:'fuck'
  });
};
