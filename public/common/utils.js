/**
 * Created by zyg on 16/1/13.
 */
var  _ = require('lodash');

window.log = (_)=>_;

if(env.isDevelopment){
  window.log = console.log.bind(console);
}

module.expors = {

  /**
   * 从 http://weqwjio.pqewo/wwer/xxxx.zzz 中
   * 截取 xxxx 名字
   * @param url
   */
  getNameFromUrl(url){
    var  r = '';
    if(url) {
      var  lastDotI = url.lastIndexOf('.');
      var  lastDashI = url.lastIndexOf('/');

      if (lastDashI < lastDotI) {
        r = url.substring(lastDashI + 1, lastDotI);
      }
    }
    return r;
  },
  
  getFullNameFromUrl(url){
    var  r = '';
    if(url) {
      var  lastDashI = url.lastIndexOf('/');

      r = url.substr(lastDashI + 1);
    }
    return r;
  }

};