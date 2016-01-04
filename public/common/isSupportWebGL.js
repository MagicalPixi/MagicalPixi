/**
 * Created by zyg on 16/1/1.
 */

var isSupportWebGLFn = function () {
  var result = false;

  if (!!window.WebGLRenderingContext) {
    var canvas = document.createElement("canvas"),
      names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
      context = false;

    for (var i = 0; i < 4; i++) {
      try {
        context = canvas.getContext(names[i]);
        if (context && typeof context.getParameter == "function") {
          // else, return just true
          return true;
        }
      } catch (e) {
        
      }
    }

    // WebGL is supported, but disabled
    return false;
  }

  // WebGL not supported
  return false;
}

var isSupportWebGL = null;

module.exports = function () {
  if(isSupportWebGL === null){
    isSupportWebGL = isSupportWebGLFn();
  }
  return isSupportWebGL;
};