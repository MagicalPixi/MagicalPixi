/**
 * Created by zyg on 16/1/12.
 */

var path = require('path');

var Model = require('./Model');

var collectionName = 'sprites';

var db = function(cb) {
  return Model.db(function(db) {
    return cb(db.collection(collectionName));
  });
};

module.exports = {

  save:function(){
    return new Promise(function (resolve) {

      db(function (collection) {

      });
    })
  }
};