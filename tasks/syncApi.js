/**
 * Created by zyg on 16/1/16.
 */
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var outputEnv = path.resolve(__dirname,'../public/js/API.js');

var pre = 'module.exports=';

var nodeAPIDir = path.resolve(__dirname,'../api/');

module.exports = function (gulp) {
  
  gulp.task('syncAPI', function () {
    var list = _.filter(fs.readdirSync(nodeAPIDir), function (name) {
      return /\.js$/.test(name);
    }).map(function (name) {
      return name.replace('./','').replace('.js','');
    }).reduce(function (init,next) {
      init[next] = path.join('/api/',next);
      return init;
    },{});

    var content = pre + JSON.stringify(list,null,2) + ';';

    fs.writeFileSync(outputEnv,content)
  })
};