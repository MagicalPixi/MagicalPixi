'use strict'

var Basic = require('../models/Basic');

var saveImageByBase64 = require('../services/saveImageByBase64');

var savePixiJson = require('../services/savePixiJson');

module.exports = function (req, res) {

  var pngBase64 = req.body.png;
  var json = req.body.json;

  json = JSON.parse(json);

  saveImageByBase64(pngBase64).then(function (filename) {

    json.meta.image = filename;

    console.log('filename:',filename);

    savePixiJson(json).then(function (jsonFilename) {

      var name = jsonFilename.replace('.json','');

      console.log('jsonFilename:',jsonFilename);

      Basic.insertOne({
        name,
      }).then(function (result) {

        res.json({result});
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