/**
 * Created by zyg on 16/1/16.
 */
/**
 * 简单的封装，快速生成一个可用于增删改的数据对象。
 */
var Model = require('./Model');

var collectionName = 'sprites';

var _ = require('lodash');

module.exports = function (collectionName) {
  var db = Model.db(collectionName);

  var model = _.map(['insertOne','findOne'],function (funName) {

    return {
      [funName]:function (args) {
        return new Promise(function (resolve) {
          db(function (collection) {

            collection[funName](args, function (err, result) {
              if(err){ throw err }
              resolve(result);
            })
          })
        })
      }
    }
  }).reduce(function (init, next) {
    return Object.assign(init,next);
  },{});

  return model;
};