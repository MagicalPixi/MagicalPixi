'use strict'

var _ = require('lodash');

var path = require('path');
var fs = require('fs');
var utils = require('./utils');

var urlPathPre = '/basic/';

var dir = path.resolve(__dirname,'../public/basic/');

var imageExt = /\.(png|jpg|gif)/;

utils.dirExists(dir);

module.exports = function (pixiJson) {

  if(_.isString(pixiJson)){
    pixiJson = JSON.parse(pixiJson);
  }

  var imageName = pixiJson.meta.image;

  var jsonName = imageName.replace(imageExt,'') + '.json';

  var fullFilename = path.join(dir,jsonName);

  pixiJson = JSON.stringify(pixiJson);

  return new Promise(function (resolve) {

    fs.writeFile(fullFilename,pixiJson, function (err) {
      console.log(err);
      if(err){
        throw err
      }
      resolve({
        jsonName,
        resourceJsonUrl:`${urlPathPre}${jsonName}`
      });
    });
  })
};