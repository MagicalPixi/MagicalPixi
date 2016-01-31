/**
 * Created by zyg on 16/1/31.
 */

module.exports = function (query) {
  return Object.keys(query).map(query, function (k) {
    let v = query[k];
    if(typeof v === 'object'){
      v = JSON.stringify(v)
    }

    return `${k}=${v}`;
  }).join('&');

};