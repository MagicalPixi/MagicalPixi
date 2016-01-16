/**
 * Created by zyg on 16/1/12.
 */
var ObjectId = require('mongodb').ObjectID;
var Model = require('./Model');

var collectionName = 'sprites';

var db = Model.db(collectionName);

var saveObjBuild = function (args) {

  var isLostArg = ['userFlag','type','name','properties','resourceUrl'].some(function (key) {
    return !args[key];
  });

  if(isLostArg){
    return false;
  }

  var buildArgs = Object.assign({},args);
  delete  buildArgs.id;
  return buildArgs;
};


var insertOne = function (collection,args,resolve) {
  collection.insertOne(args, function (err,result) {
    if(err){throw err;}

    resolve(result.result);
  });
}

module.exports = {

  /**
   *
   * @param args
   * args.userFlag 谁
   * args.type 精灵类型
   * args.name 素材名字
   * args.properties 属性
   * args.resourceUrl 资源所在位置
   * @returns {Promise}
   */
  save(args){

    return new Promise((resolve)=>{

      var buildArgs = saveObjBuild(args);
      if(!args){
        throw new Error('lost arg');
      }

      db((collection)=>{

        console.log('args.id:',args.id);

        if(args.id){

          this.findOne({
            _id:ObjectId(args.id)
          }).then(r=>{

            console.log('save find :',r);
            console.log('buildArgs :',buildArgs);

            if(r){

              try{
                collection.updateOne({
                  _id:ObjectId(args.id)
                },{
                  $set:buildArgs
                },(err,result)=>{
                  if(err){
                    throw err;}

                  console.log('update sucess:',result.result);

                  resolve(result.result);
                })
              }catch(e){
                console.log("e:",e);
                resolve(false);
              }

            }else{
              insertOne(collection,buildArgs,resolve)
            }
          });
        }else{
          insertOne(collection,buildArgs,resolve)
        }
      });
    })
  },

  /**
   * @param findObj
   * findObj.name 查找的素材的名字
   */
  findOne(findObj){

    return new Promise(function (resolve) {

      db(function (collection) {
        collection.findOne(findObj, function (err, result) {
          if( err) { throw err}
          resolve(result);
        });
      })
    })
  },
  /**
   * @param query
   */
  fineAll(){
    return new Promise(function (resolve) {
      db(function (collection) {
        collection.find().toArray(function (err, sprites) {
          if(err){
            throw err;
          }
          resolve(sprites);
        })
      })
    })
  },
  /**
   *
   */
  deleteOne(arg){
    var id = arg.id;

    return new Promise(function(resolve){

      db(function(collection){
        try{
          collection.deleteOne({
            _id:ObjectId(id)
          }, function (err, result) {
            if(err){ throw err}
            resolve(result)
          })
        }catch(e){
          throw e;
        }
      })
    })
  }
};