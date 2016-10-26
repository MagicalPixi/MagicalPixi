/**
 * Created by zyg on 16/1/11.
 *
 * 上传精灵图片和json文件
 */
var multipart = require('connect-multiparty');

var saveMaterials = require('../services/saveMaterials');

var postFile = require('../services/postFile');

var _ = require('lodash');

module.exports = [multipart(),function(req,res){
  var image = req.files.png;
  var json = req.files.json;

  var dir = (req.userFlag || saveMaterials.userDirDefault) + '/';

  console.log(req.files.png);

  //---
  // try{
  //   postFile(req.files.png.name,req.files.png.path);
  // }catch (e){
  //   console.error(e);
  // }

  var allP = _.filter([
    json,
    image,
  ], function (uploadObj) {
    return !!uploadObj;
  }).map(function (uploadObj) {

    return saveMaterials(dir,uploadObj)
  });

  Promise.all(allP).then(function (result) {

    res.json({
      url:saveMaterials.publicImageDir + dir + result[0]
    })

  }).catch(function (e) {
    console.log('文件存取错误');
    console.log(e);
    res.json({
      result: false,
      message: '文件存取错误'
    })
  });
}];