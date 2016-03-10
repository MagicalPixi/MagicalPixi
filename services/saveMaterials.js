/**
 * Created by zyg on 16/1/1.
 */
/**
 * Created by zyg on 15/10/24.
 */
var path = require('path');
var fs = require('fs');
var utils = require('./utils');

var imagesDir = 'materials/';
var userDirDefault = 'admin';
var projectImagesDir = path.resolve(__dirname,'../public/',imagesDir);

var saveImg = function saveImg(dir,file){

  if(typeof file === 'undefined'){
    file = dir;
    dir = userDirDefault;
  }

  dir = dir || userDirDefault;

  var uploadFileName = file.name;
  var format = uploadFileName.substr(uploadFileName.lastIndexOf('.'));

  var finalFileName = uploadFileName;//id+format;

  var finalDir = path.resolve(projectImagesDir,dir);

  var targetFilePath = path.resolve(finalDir,finalFileName);

  return new Promise(function(resolve){


      var writeStream = fs.createWriteStream(targetFilePath);
      var readStream = fs.createReadStream(file.path);
      var st = +new Date();

      readStream.on('error',function(err){
        throw err;
      });

      readStream.on('end',function(err){
        console.log('file 处理完成,耗时:',(+new Date()) - st);
        resolve(finalFileName);
      });

      readStream.pipe(writeStream);
  });
};

saveImg.userDirDefault = userDirDefault;
saveImg.publicImageDir = '/'+imagesDir;

//自动生成images文件夹，防止error
utils.dirExists(projectImagesDir);

module.exports = saveImg;