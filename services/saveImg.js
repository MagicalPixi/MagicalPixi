/**
 * Created by zyg on 16/1/1.
 */
/**
 * Created by zyg on 15/10/24.
 */
var path = require('path');
var fs = require('fs');

var imagesDir = '../public/images/';

module.exports = function(id,file){

  var uploadFileName = file.name;
  var format = uploadFileName.substr(uploadFileName.lastIndexOf('.'));
  var finalFileName = id+format;

  var targetFilePath = path.resolve(__dirname,imagesDir,finalFileName);

  return new Promise(function(resolve){
    var writeStream = fs.createWriteStream(targetFilePath);
    var readStream = fs.createReadStream(file.path);

    readStream.pipe(writeStream);

    var st = +new Date();

    readStream.on('error',function(err){
      throw err;
    });

    readStream.on('end',function(err){
      console.log('file 处理完成,耗时:',(+new Date()) - st);
      resolve(finalFileName);
    });
  });
};