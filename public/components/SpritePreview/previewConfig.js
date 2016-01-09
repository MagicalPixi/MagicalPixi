/**
 * Created by zyg on 16/1/9.
 *
 * 常量，设置集合
 */
let sprite = require('../../common/sprite');

const SPRITE_MC = 'movieClip';
const SPRITE_IM = 'image';

let settingListConfigMap = (spriteType)=>{
  let config = {
    [SPRITE_IM]: [{
      name: 'name',
      key: 'name'
    }, {
      name: 'x',
      key: 'x',
      describe: 'for x'
    }, {
      name: 'y',
      key: 'y',
      describe: 'for y'
    }, {
      name: 'scale.x',
      key: 'scale.x',
      describe: 'for scale.x'
    }],
    [SPRITE_MC]: [{
      name: 'name',
      key: 'name'
    }, {
      name: 'x',
      key: 'x',
      describe: 'for x'
    }, {
      name: 'y',
      key: 'y',
      describe: 'for y'
    }, {
      name: 'scale.y',
      key: 'scale.y',
      describe: 'for scale.y'
    }, {
      name: 'animateSpeed',
      key: 'animateSpeed',
      describe: 'animateSpeed'
    }, {
      name: 'play and Stop',
      checkbox: {
        true: 'play',
        false: 'stop'
      },
    }]
  }

  return config[spriteType] || config[SPRITE_MC];
};


let spriteFnMap = (spriteType)=>{

  let config = {
    [SPRITE_IM]:sprite.getIm,
    [SPRITE_MC]:sprite.getMc
  };

  if(!spriteType){
    console.error('sprite fn null');
  }

  return config[spriteType]
};

module.exports = {
  SPRITE_IM,
  SPRITE_MC,
  spriteFnMap,
  settingListConfigMap
};