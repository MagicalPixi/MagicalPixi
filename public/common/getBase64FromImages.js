/**
 *
 * @param images
 *  [wrapperImage,wrapperImage....] 数组
 */
module.exports = function (wrapperImages) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  wrapperImages.map(wrapperImage=>{

    context.drawImage(wrapperImage.img,wrapperImage.x,wrapperImage.y);
  });

  var base64 = canvas.toDataURL();

  return base64;
};