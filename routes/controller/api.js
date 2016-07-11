/**
 * Created by zyg on 16/1/1.
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash')

var apiDir = '../../api/';

var apiList = fs.readdirSync(path.resolve(__dirname, apiDir));

var outputs = apiList.filter(function (filename) {
  return !/^\./.test(filename);
}).map(apiOne=> {

  var apiPath = path.resolve(__dirname, apiDir, apiOne);

  if (fs.lstatSync(apiPath).isDirectory()) {
    return fs.readdirSync(apiPath).map(function (dirApi) {
      return [dirApi, require(path.join(apiPath, dirApi))];
    }).map(function (fn) {
      fn[1].apiName = fn[0].replace('.js', '');
      fn[1].method = apiOne;
      return fn[1];
    });
  } else {
    var apiFn = require(apiPath);
    apiFn.apiName = apiOne.replace('.js', '');

    return apiFn;
  }

}).reduce((init,next)=>{

  if(next.apiName){
    return init.concat([next])
  }else{
    return init.concat(next)
  }

},[]).map(function (fn) {

    return [
      fn.apiName,
      fn
    ]
  }).reduce(function (initial, next) {
    initial[next[0]] = next[1];

    return initial
  }, {});

module.exports = outputs;