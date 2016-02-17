/**
 * Created by zyg on 16/1/16.
 */
/**
 * 简单的封装，快速生成一个可用于增删改的数据对象。
 */
var ObjectId = require('mongodb').ObjectID;
var Model = require('./Model');

var insertOne = (collection,args,resolve) => {
  collection.insertOne(args, function (err,result) {
    if(err){throw err;}

    resolve(result.result);
  });
};

var saveFn = (db) => (arg) => {

  return new Promise(function (resolve) {

    db((collection)=>{

      if(args.id){

        this.findOne({
          _id:ObjectId(args.id)
        }).then(r=>{

          if(r){

            try{
              collection.updateOne({
                _id:ObjectId(args.id)
              },{
                $set:arg
              },(err,result)=>{
                if(err){
                  throw err;}

                resolve(result.result);
              })

            }catch(e){

              resolve(false);
            }

          }else{
            delete arg.id;
            insertOne(collection,arg,resolve)
          }
        });
      }else{
        insertOne(collection,arg,resolve)
      }
    });

  });
};

module.exports = function (collectionName) {
  var db = Model.db(collectionName);

  var model = ['insertOne','findOne'].map(function (funName) {

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


  model.save = saveFn(db);

  return model;
};