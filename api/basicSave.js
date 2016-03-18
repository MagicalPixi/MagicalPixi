'use strict'

var Basic = require('../models/Basic');

var saveImageByBase64 = require('../services/saveImageByBase64');

var savePixiJson = require('../services/savePixiJson');

module.exports = function (req, res) {

  var _id = req.body._id;
  var type = req.body.type;
  var name = req.body.name;
  var pngBase64 = req.body.png;
  var json = req.body.json;
  var originImgUrls = req.body.originImgUrls;

  console.log(originImgUrls);

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

    return Basic.save({
      _id,
      type,
      name,
      resourceName,
      resourceUrl,
      originImgUrls
    });
  }).then(function (result) {
    var savedObj = result.ops[0];

    res.json({
      result: {
        name,
        resourceName:savedObj.name,
        resourceUrl:savedObj.resourceUrl,
      }
    });

  }).catch(function (err1) {
    console.log('saveBasic',err1);

    res.json({err1})
  });
};