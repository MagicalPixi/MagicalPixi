/**
 * Created by zyg on 16/2/17.
 */
var ObjectId = require('mongodb').ObjectID;
var Scene = require('../models/Scene');

var buildMaterialZipSource = require('../services/buildMaterialZipSource');

var archiverZip = require('../services/archiverDownloadZip');

var MaterialZip = require('../models/MaterialZip');

module.exports = function (req,res,next) {

  var id = req.query.id || req.query._id;
  var sceneTitle = req.query.sceneTitle;

  var query = {};

  if(id){
    query = {
      _id:ObjectId(id)
    }
  }else if(sceneTitle){
    query = {
      sceneTitle
    }
  }else{
    return next(new Error('no id or title'));
  }

  var spriteNames = [];

  Scene.findOne(query).then((scene)=>{

    var viewData = scene.viewData;
    sceneTitle = scene.sceneTitle;

    viewData = JSON.parse(viewData);

    viewData = viewData.map(container=>{
      return container.children;
    }).reduce((pre,next)=>{
      return pre.concat(next);
    },[]);

    return Promise.all(viewData.map(sprite=>{

      spriteNames.push(sprite.name);

      return buildMaterialZipSource(sprite);
    }));
  }).then(zipSources=>{

    return Promise.all(zipSources.map((zipSource,i)=>{
      return archiverZip(`${spriteNames[i]}.zip`,zipSource);
    }));

  }).then(zipPaths=>{

    var sceneZipSource = zipPaths.map((zipPath,i)=>{
      return {
        [`${spriteNames[i]}.zip`]:zipPath
      }
    }).reduce((pre,next)=>{
      return Object.assign(pre,next);
    },{});

    return archiverZip(`${sceneTitle}.zip`,sceneZipSource)

  }).then(sceneZipPath=>{

    res.download(
      sceneZipPath,
      `${sceneTitle}.zip`
    )

  }).catch((e)=>{
    next(e);
  });
};