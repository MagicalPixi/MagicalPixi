/**
 * Created by zyg on 16/10/12.
 */
var Scene = require('../models/Scene');
var ObjectId = require('mongodb').ObjectID;

var fs = require('fs')

var stageTempBuild = require('../services/template/stageTempBuild');

var saveJsContent = require('../services/dbServer/saveJsContent')

module.exports = function (req,res) {

  var id = req.query.id;

  Scene.findOne({
    _id:ObjectId(id)
  }).then(sceneData=>{

    sceneData.viewData = JSON.parse(sceneData.viewData);

    var s = stageTempBuild(sceneData);

    return saveJsContent({
      content:s.text,
    },{
      name:'test'
    });


  }).then(res=>{

    console.log(res.data);

    res.json({
      result:res.data
    })

  }).catch(e=>{

    console.log('sceneOutput:',e);
  });
};
