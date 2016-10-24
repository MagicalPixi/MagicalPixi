/**
 * Created by zyg on 16/10/12.
 */
var Scene = require('../models/Scene');
var ObjectId = require('mongodb').ObjectID;

var fs = require('fs')

var stageTempBuild = require('../services/template/stageTempBuild');

var saveJsContent = require('../services/dbServer/saveJsContent')

var requests = require('../services/requests');

module.exports = function (req,res) {

  var id = req.query.id;

  Scene.findOne({
    _id:ObjectId(id)
  }).then(sceneData=>{

    sceneData.viewData = JSON.parse(sceneData.viewData);

    var s = stageTempBuild(sceneData);

    return saveJsContent({
      name:'test.js',
      content:s.text,
    });


  }).then(saveRes=>{
    /**
     * data { url:'xxx' }
     */
    console.log(saveRes.data);

    return requests.game.create({
      js:saveRes.data.url
    });


  }).then(createRes=>{

    console.log(createRes.data)

    res.json({
      data:createRes
        .data
    })

  }).catch(e=>{

    console.log('sceneOutput:',e);
  });
};
