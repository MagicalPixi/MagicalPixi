var _ = require('lodash');

/**
 *
 * 包装images对象，为其加上x，y坐标
 *
 * 目前是一次性的认作横排，@TODO 优化排列，合理利用空间
 *
 * @param images
 *  [canvas or Image,canvas|Image ...] 数组
 */
module.exports = function (images) {

  return [].concat(images).reduce((init, next)=> {

    if (init.length === 0) {
      return init.concat({
        x: 0,
        y: 0,
        w:next.width,
        h:next.height,
        img: next
      });
    }

    var last = _.last(init);

    return init.concat({
      x: last.x + last.w,
      y: 0,
      w:next.width,
      h:next.height,
      img: next
    });

  }, []);

};
