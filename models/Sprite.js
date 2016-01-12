/**
 * Created by zyg on 16/1/12.
 */

var path = require('path');

var Model = require('./Model');

var collectionName = 'sprites';

var db = Model.db(collectionName);

var saveObjBuild = function (args) {

  var isLostArg = ['userFlag','type','name','properties'].some(function (key) {
    return !args[key];
  });

  if(isLostArg){
    return false;
  }

  return args;
};

module.exports = {

  /**
   *
   * @param args
   * args.userFlag 谁
   * args.type 精灵类型
   * args.name 素材名字
   * args.properties 属性
   * @returns {Promise}
   */
  save:function(args){

    return new Promise(function (resolve) {

      args = saveObjBuild(args);
      if(!args){
        throw new Error('lost arg');
      }

      db(function (collection) {

        collection.insertOne(args, function (err,result) {
          if(err){
            throw err;
          }

          resolve(result.result);
        });
      });
    })
  }
};