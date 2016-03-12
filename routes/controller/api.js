/**
 * Created by zyg on 16/1/1.
 */
var fs = require('fs');
var path = require('path');

var apiDir = '../../api/';

var apiList = fs.readdirSync(path.resolve(__dirname,apiDir));

var outputs = apiList.filter(function (filename) {
  return !/^\./.test(filename);
}).map(function (apiOne) {

  return [
    apiOne.replace('.js',''),
    require(path.resolve(__dirname,apiDir,apiOne))
  ]
}).reduce(function (initial,next) {
  initial[next[0]] = next[1];

  return initial
},{});

module.exports = outputs;