/**
 * Created by zyg on 16/1/4.
 */
var r = require('./isSupportWebGL')();

module.exports = function () {
  var renderer = null;

  if(r){
    renderer= new PIXI.WebGLRenderer(320, 502, {
        transparent:true
      }
    );
  }else{
    renderer= new PIXI.CanvasRenderer(320, 502, {
        transparent:true
      }
    );
  }

  return renderer;
};