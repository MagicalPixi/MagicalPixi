/**
 * Created by zyg on 16/1/16.
 */
/**
 * 简单的封装，快速生成一个可用于增删改的数据对象。
 */
var ObjectId = require('mongodb').ObjectID;
var Model = require('./Model');

var insertOne = (collection,arg,resolve) => {

  delete arg.id;
  delete arg._id;

  collection.insertOne(arg, function (err,result) {
    if(err){throw err;}

    resolve(result.result);
  });
};

var saveFn = (db) => {

  return function (arg) {

    var id = arg.id || arg._id;

    delete arg.id;
    delete arg._id;

    return new Promise((resolve) => {

      db((collection)=> {

        if (id) {

          this.findOne({
            _id: ObjectId(id)
          }).then(r=> {

            if (r) {

              try {
                collection.updateOne({
                  _id: ObjectId(id)
                }, {
                  $set: arg
                }, (err, result)=> {
                  if (err) {
                    throw err;
                  }

                  resolve(result.result);
                })

              } catch (e) {

                console.log('save e:',e);

                resolve(false);
              }

            } else {
              insertOne(collection, arg, resolve)
            }
          });
        } else {
          insertOne(collection, arg, resolve)
        }
      });
    });
  };
}

var findFn = (db) => (arg) => {
  return new Promise((resolve)=>{
    db(collection=>{

      resolve(collection.find(arg))
    })
  })
}

module.exports = function (collectionName,extraProperties) {
  var db = Model.db(collectionName);

  var model = ['insertOne','findOne'].map(function (funName) {

    return {
      [funName]:function (arg) {
        return new Promise((resolve)=>{
          db((collection)=>{

            collection[funName](arg, function (err, result) {
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


  model.find = findFn(db);
  model.save = saveFn(db);

  return model;
};