/**
 * Created by zyg on 16/1/4.
 */
var setValue = function(obj,key,value){
  if(key.length === 1){
    var k0 = key[0];
    if(typeof obj[k0] === 'function'){
      obj[k0].apply(obj,[].concat(value));
    }else{
      obj[k0] = value;
    }
  }else{
    setValue(obj[key.shift()],key,value);
  }
  return obj;
};

module.exports = function(object,config){
  for(var k in config){
    setValue(object, k.split('.'),config[k]);
  }
  return object;
};