
let PIXI = require('PIXI');

let count = 0;

module.exports = function (resourceUrl, cb) {
  let resourceKey = 'img' + Date.now() + '' + (count++);

  PIXI.loader.add(resourceKey,resourceUrl)
    .load((loader,resources)=>{

      cb(resources[resourceKey]);
    });
};