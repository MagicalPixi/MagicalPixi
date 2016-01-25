/**
 * Created by zyg on 16/1/25.
 */
let PIXI = require('PIXI');

module.exports = function (resourceUrl, cb) {
  let resourceKey = 'img' + Date.now();

  PIXI.loader.add(resourceKey,resourceUrl)
    .load((loader,resources)=>{

      cb(resources[resourceKey]);
    });
};