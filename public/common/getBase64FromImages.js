/**
 *
 * @param images
 *  [wrapperImage,wrapperImage....] 数组
 */
module.exports = function (wrapperImages) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  var canvasSize = wrapperImages.reduce((init,next)=>{
    init.w += next.w;
    if(init.h < next.h){
      init.h = next.h;
    }
    return init;
  },{
    w:0,
    h:0
  });

  canvas.width = canvasSize.w;
  canvas.height = canvasSize.h;

  wrapperImages.map(wrapperImage=>{

    context.drawImage(wrapperImage.img,wrapperImage.x,wrapperImage.y);
  });

  var base64 = canvas.toDataURL();

  return base64;
};