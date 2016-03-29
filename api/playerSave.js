'use strict'

var Player = require('../models/Player');
var saveImageByBase64 = require('../services/saveImageByBase64');

var savePixiJson = require('../services/savePixiJson');

module.exports = function (req, res) {
  var id = req.body.id;
  var type = req.body.type;
  var name = req.body.name;
  var pngBase64 = req.body.base64;
  var json = req.body.pixiJson;
  var childSprites = req.body.childSprites;

  console.log(childSprites);
  json = JSON.parse(json);

  saveImageByBase64(pngBase64).then(function (pngResult) {

    var filename = pngResult.filename;
    var pngUrl = pngResult.resourcePngUrl;

    json.meta.image = filename;

    return Promise.race([
      new Promise(function (resolve) {
        if(type === 'mc'){
          savePixiJson(json).then(function (jsonResult) {

            var jsonFilename = jsonResult.jsonName;
            var jsonUrl = jsonResult.resourceJsonUrl;

            resolve({
              filename:jsonFilename,
              resourceUrl:jsonUrl
            });
          });
        }
      }),
      new Promise(function(resolve){
        if(type === 'im'){
          resolve({
            filename,
            resourceUrl:pngUrl
          });
        }
      })
    ]);
  }).then(function (result) {
    console.log('save pre:',result);

    var resourceUrl = result.resourceUrl;
    var resourceName = resourceUrl.replace(/\.(json|png)/, '');

    return Player.save({
      id,
      name,
      type,
      resourceName,
      resourceUrl,
      childSprites
    })
  }).then(function (result) {

    var savedObj = result.ops[0];

    res.json({
      result:{
        _id:savedObj._id,
        name,
        resourceName:savedObj.resourceName,
        resourceUrl:savedObj.resourceUrl,
      }
    });
  }).catch(function (err) {
    console.log('err:',err);

    res.json({
      err
    })
  });
};