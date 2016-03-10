'use strict'

var Basic = require('../models/Basic');

var saveImageByBase64 = require('../services/saveImageByBase64');

var savePixiJson = require('../services/savePixiJson');

module.exports = function (req, res) {

  var _id = req.body._id;
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

    console.log('filename:',filename);

    savePixiJson(json).then(function (jsonResult) {

      var jsonFilename = jsonResult.jsonName;
      var jsonUrl = jsonResult.resourceJsonUrl;

      var resourceName = jsonFilename.replace('.json','');

      console.log('jsonFilename:',jsonFilename);

      Basic.save({
        _id,
        name,
        resourceName,
        resourceUrl:jsonUrl,
        originImgUrls
      }).then(function (result) {

        res.json({
          result:{
            name,
            resourceName,
            resourceUrl:jsonUrl
          }
        });

      }).catch(function (err3) {
        console.log('Basic.insertOne',err3);

        res.json({err3})
      });

    }).catch(function (err2) {
      console.log('savePixi',err2);

      res.json({err2})
    });
  }).catch(function (err1) {
    console.log('saveBase64',err1);

    res.json({err1})
  });
};