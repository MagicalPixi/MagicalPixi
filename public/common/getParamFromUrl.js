/**
 * Created by zyg on 16/2/18.
 */
module.exports = function () {

  var params = location.search.substr(1).split('&').map(function (kv) {
    return kv.split('=')
  }).reduce(function (init, next) {

    return Object.assign(init,{
      [next[0]]:next[1]
    })

  },{})

  return params;
};