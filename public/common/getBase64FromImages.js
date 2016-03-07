var _ = require('lodash');

/**
 *
 * @param images
 *  [Image,Image....] 数组
 */
module.exports = function (images) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  [].concat(images).reduce((init,next)=>{

    if(init.length === 0){
      return init.concat({
        x:0,
        y:0,
        img:next
      });
    }

    var last = _.last(init);

    return init.concat({
      x:last.x + last.img.width,
      y:0,
      img:next
    });

  },[]).map(imageContainer=>{

    context.drawImage(imageContainer.img,imageContainer.x,imageContainer.y);
  });

  var base64 = canvas.toDataURL();

  return base64;
};