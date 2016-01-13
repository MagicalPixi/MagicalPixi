/**
 * Created by zyg on 16/1/13.
 */
let _ = require('lodash');

module.expors = {

  /**
   * 从 http://weqwjio.pqewo/wwer/xxxx.zzz 中
   * 截取 xxxx 名字
   * @param url
   */
  getNameFromUrl(url){
    let r = '';
    if(url) {
      let lastDotI = url.lastIndexOf('.');
      let lastDashI = url.lastIndexOf('/');

      if (lastDashI < lastDotI) {
        r = url.substring(lastDashI + 1, lastDotI);
      }
    }
    return r;
  }

};