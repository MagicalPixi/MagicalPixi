var timeStamp = Date.now();
var count = 0;

var createPixiJson = ()=>{
  return {
    frames:{},
    meta:{
      image:'',
      size:{
        w:0,
        h:0
      },
      scale:1
    }
  };
};

var createFrame = (wrapperImage)=>{

  var suffix = timeStamp + (++count);

  var {x,y,w,h} = wrapperImage;

  return {

    [`frameName${suffix}.png`]:{
      frame:{
        x,
        y,
        w,
        h
      },
      spriteSourceSize:{
        x:0,
        y:0,
        w,
        h
      },
      sourceSize:{
        w,
        h
      }
    }
  }
};

/**
 *
 * @param images
 *  [wrapperImage,wrapperImage....] 数组
 */
module.exports = function (wrapperImages) {

  var pixiJson = createPixiJson();

  pixiJson.frames = wrapperImages.map(wrapperImage=>{
    return createFrame(wrapperImage);
  }).reduce((pre,next)=>{
    return Object.assign(pre,next);
  });

  return pixiJson;
};