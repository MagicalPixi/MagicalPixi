/**
 * Created by zyg on 16/1/1.
 */
var multipart = require('connect-multiparty');

var express = require('express');

var saveImg = require('../../services/saveImg');

var _ = require('lodash');


module.exports = {
  fileUpload:[multipart(),function(req,res){
    var image = req.files.png;
    var json = req.files.json;

    var dir = (req.userFlag || saveImg.userDirDefault) + '/';

    var allP = _.filter([
      json,
      image,
    ], function (uploadObj) {
      return !!uploadObj;
    }).map(function (uploadObj) {

      return saveImg(dir,uploadObj)
    });

    Promise.all(allP).then(function (result) {

      console.log('result',result);

      res.json({
        url:saveImg.publicImageDir + dir + result[0]
      })

    }).catch(function (e) {
      console.log('文件存取错误');
      console.log(e);
      res.json({
        result: false,
        message: '文件存取错误'
      })
    });


  }]
};