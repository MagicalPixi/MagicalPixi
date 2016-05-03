'use strict'

var path = require('path');
var fs = require('fs');

var utils = require('./utils');

var urlPathPre = '/basic/';

var dir = path.resolve(__dirname,'../public/basic/');


var countName = 0;

var base64Prefix = /^data:image\/(png|gif|jpeg);base64,/;


var savePngName = function (name,suffix) {

  if(!name){
    name = '';
  }
  if(!suffix){
    suffix = 'png';
  }


  var timeStamp = Date.now();

  return `${name}_${timeStamp}_${++countName}.${suffix}`;
};

utils.mkdirIfNotExists(dir);

module.exports = function (base64,option) {

  if(!base64){
    base64 = '';
  }
  if(!option){
    option = {};
  }

  var base64Clean = base64.replace(base64Prefix,'');

  console.log('base64:',typeof base64,base64.length);

  var base64Buffer = new Buffer(base64Clean,'base64');

  var filename = savePngName();

  var fullFilename = path.join(dir,filename);

  return new Promise(function (resolve) {

    fs.writeFile(fullFilename,base64Buffer, function (err) {
      console.log(err);
      if(err){
        throw err
      }
      resolve({
        filename,
        resourcePngUrl:`${urlPathPre}${filename}`
      });
    });
  });

};