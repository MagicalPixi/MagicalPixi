'use strict'
var _ = require('lodash');

var fs = require('fs');

var path = require('path');

var express = require('express');

var router = express.Router();

var controllerDirName = './controller';

var controllerDir = path.resolve(__dirname, controllerDirName);

var jsFileRegExp = /\.js$/;

//加载指定的路由
var loadAllRoutes = function (dir) {

  _.filter(fs.readdirSync(dir), function (controllerName) {
    return jsFileRegExp.test(controllerName);
  }).forEach(function (controllerName) {
    var controllerNameWithoutExtension = controllerName.replace(/\.js$/, '');

    try {
      var controller = require(path.resolve(__dirname, dir, controllerNameWithoutExtension));
      Object.keys(controller).forEach(function (routerName) {
        var route = '/' + controllerNameWithoutExtension + '/' + routerName;
        var fn = controller[routerName];

        [].concat(fn).forEach(function (f) {
          router.post(route, f);
          router.get(route, f);
        });
      });
    } catch (_error) {
      console.error(_error);
    }
  });
};

[controllerDir].forEach(loadAllRoutes);

module.exports = router;


//# sourceMappingURL=index.js.map
