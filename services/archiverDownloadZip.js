/**
 * Created by zyg on 16/1/15.
 */
var fs = require('fs');
var path = require('path');
var _  = require('lodash');

var archiverType = require('archiver');

var downloadDir = path.resolve(__dirname,'../public/download');

fs.exists(downloadDir, function (isExists) {
  if(!isExists){
    fs.mkdir(downloadDir);
  }
});
/**
 *
 * @param targetZip 生成压缩包的路径
 * @param source
 *    filePath : name
 *    buffer : name
 * @param done
 */
module.exports = function (targetZip,source) {
  var outputPath = path.resolve(downloadDir,targetZip);
  var output = fs.createWriteStream(outputPath);

  var archiver = archiverType('zip');

  return new Promise(function (resolve) {

    output.on('close', function (err) {
      resolve(outputPath);
    });

    archiver.on('error', function (err) {
      throw err;
    });

    archiver.pipe(output);

    Object.keys(source).map(function (filename) {
      var src = source[filename];

      //文件路径
      if(typeof src === 'string'){
        src = fs.createReadStream(src);
      }

      archiver.append(src,{
        name:filename
      });
    });

    archiver.finalize();
  });
};