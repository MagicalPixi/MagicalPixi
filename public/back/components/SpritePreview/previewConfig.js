/**
 * Created by zyg on 16/1/9.
 *
 * 常量，设置集合
 */
let pixiLib = require('pixi-lib');
let _ = require('lodash');

const SPRITE_MC = 'movieClip';
const SPRITE_IM = 'image';

let settingListConfigMap = ((spriteType)=> {

  let basic = [
    {
      name: '素材名字',
      key: 'spriteName'
    }, {
      name: '原点X',
      key: 'anchor.x',
      value:'0',
      describe: '原点X'
    }, {
      name: '原点Y',
      key: 'anchor.y',
      value:'0',
      describe: '原点Y'
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
    }, {
      name: 'scale.y',
      key: 'scale.y',
      describe: 'for scale.y'
    }, {
      name: 'rotation',
      key: 'rotation',
      describe: 'rotation'
    }
  ];

  let config = {
    [SPRITE_IM]: [],
    [SPRITE_MC]: [{
      name: 'animationSpeed',
      key: 'animationSpeed',
      describe: 'animationSpeed'
    }, {
      name: 'loop',
      key: 'loop',
      checkbox: {
        'true': true,
        'false': false,
        'default':true
      }
    },{
      name: 'play and Stop',
      checkbox: {
        true: 'play',
        false: 'stop'
      }
    }]
  };

  config = _.map(config, (v, k)=> {
    return {
      [k]: basic.concat(v)
    }
  }).reduce((init, next)=> {
    return Object.assign(init, next);
  }, {});


  return (spriteType, spriteProperties)=> {

    let properties = config[spriteType];

    if (properties) {

      properties = properties.slice();

      log(spriteProperties);

      _.map(Object.keys(spriteProperties), (key)=> {
        let defaultPropertyValue = spriteProperties[key];

        properties = properties.map((propertyObj)=> {
          if (propertyObj.key === key) {
            propertyObj.value = defaultPropertyValue;
          }
          return propertyObj;
        });

      });
    }


    return properties || [];
  }
})();


let spriteFnMap = (spriteType)=> {

  let config = {
    [SPRITE_IM]: pixiLib.getIm,
    [SPRITE_MC]: pixiLib.getMc
  };

  if (!spriteType) {
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