import {INIT_PLAYER_LIST,PLAYER_ADD,PLAYER_DELETE,PLAYER_EDIT} from '../constants/playerTypes'

import pixiLib from 'pixi-lib'
import API from '../../../libs/API'
import ajax from '../../../libs/ajax'
import _ from 'lodash'
import wrapperImages from '../../../common/wrapperImages'
import getBase64FromImages from '../../../common/getBase64FromImages'
import getPixiJsonFromImages from '../../../common/getPixiJsonFromImages'

const {SPRITE_SP,SPRITE_MC,SPRITE_IM} = pixiLib.types;

function loadSpritesImg(childSprites){
  return Promise.all(childSprites.map(spriteOne=>{
    return spriteOne.basic.originImgUrls.map((urlObj)=>{
      return _.isString(urlObj) ? urlObj : urlObj.url
    })
  }).map(urls=>{
    urls = urls.concat(_.last(urls));    //这里加了一张，下面要加1
    return urls;
  }).reduce((pre,next)=>pre.concat(next),[]).map(url=>{
    var imgObj = new Image();
    imgObj.src = url;
    return imgObj;
  }).map(imgObj=>{
    return new Promise(resolve=>{
      imgObj.onload = ()=>{
        resolve(imgObj);
      }
    });
  }))
}
function build(childSprites) {

  var actionFrames = childSprites.map(spriteOne=>{
    return spriteOne.basic.originImgUrls.length + 1  //因为上面加一张
  }).reduce((init,next)=>{
    return init.concat(_.last(init) + next);
  },[0]).map(frame => frame-1);

  //去0
  actionFrames.shift();

  return function (imgObjs) {
    var type = ''; //mc精灵,im图片

    var afterWrapperImages = wrapperImages(imgObjs);

    var base64 = getBase64FromImages(afterWrapperImages);

    var pixiJson = getPixiJsonFromImages(afterWrapperImages);

    if (imgObjs.length > 1) {
      type = SPRITE_SP;
    } else {
      type = SPRITE_IM;
    }
    return new Promise(resolve=> {
      resolve({
        type,
        base64,
        pixiJson,
        actionFrames
      })
    });
  };
}

export function initPlayerList() {
  return (dispatch)=> {
    ajax(API.playerFind).get().then((returnData)=>{

      if(returnData.result){

        var result = returnData.result.map(dataOne=>{
          return Object.assign({},dataOne,{
            id:dataOne._id,
            childSprites:JSON.parse(dataOne.childSprites),
          });
        });

        dispatch({
          type:INIT_PLAYER_LIST,
          players:result
        });
      }
    });
  }
}

/**
 *
 * @param player [{
 *   basic:{basic原始素材对象},
 *   properties:{属性}
 * }]
 * @returns {Function}
 */

export function playerSave(player){

  return (dispatch,getState)=>{

    player.childSprites = player.childSprites.map(obj=>{
      delete obj.properties.textures
      return obj;
    })

    loadSpritesImg(player.childSprites)
      .then(build(player.childSprites))
      .then(buildResult=>{

        ajax(API.playerSave).post(Object.assign({
          id:player.id,
          name:player.name,
          childSprites:JSON.stringify(player.childSprites),
        },buildResult)).then(returnData=>{

          if(returnData.result){

            dispatch({
              type: player.id ? PLAYER_EDIT : PLAYER_ADD,
              player:Object.assign({},player,returnData.result)
            });
          }
        });
      });
  }
}

export function playerDelete(_id){
  return (dispatch)=>{

    ajax(API.playerDelete)
      .post({
        _id
      })
      .then(returnData=>{
        if(returnData.result){
          dispatch({
            type:PLAYER_DELETE,
            _id
          });
        }else{
          alert('删除失败');
        }
      });
  }
}