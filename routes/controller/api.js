/**
 * Created by zyg on 16/1/1.
 */
var multipart = require('connect-multiparty');

var express = require('express');

var saveImg = require('../../services/saveImg');

var imgDir = '/images/';

module.exports = {
  fileUpload:[multipart(),function(req,res){
    var files = req.files.files;

    var fileId = 'id_' + Date.now();

    saveImg(fileId, req.files.files).then(function (imgPath) {

      imgUrl = imgDir + imgPath;

      res.json({
        imgUrl:imgUrl
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