import {INIT_PLAYER_LIST,PLAYER_ADD,PLAYER_EDIT} from '../constants/playerTypes'

import API from '../../../libs/API'
import ajax from '../../../libs/ajax'

import wrapperImages from '../../../common/wrapperImages'
import getBase64FromImages from '../../../common/getBase64FromImages'
import getPixiJsonFromImages from '../../../common/getPixiJsonFromImages'


function loadSpritesImg(childSprites){
  return Promise.all(childSprites.map(spriteOne=>{
    return spriteOne.basic.originImgUrls
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

function build(imgObjs){
  var type = ''; //mc精灵,im图片

  var afterWrapperImages = wrapperImages(imgObjs);

  var base64 = getBase64FromImages(afterWrapperImages);

  var pixiJson = getPixiJsonFromImages(afterWrapperImages);

  if(imgObjs.length > 1){
    type = 'mc';
  }else{
    type = 'im';
  }
  return new Promise(resolve=>{
    resolve({
      type,
      base64,
      pixiJson
    })
  });
}

export function initPlayerList() {
  return (dispatch)=> {
    ajax(API.playerFind).get().then((returnData)=>{

      if(returnData.result){

        var result = returnData.result.map(dataOne=>{
          return {
            id:dataOne._id,
            name:dataOne.name,
            type:dataOne.type,
            resourceName:dataOne.resourceName,
            resourceUrl:dataOne.resourceUrl,
            childSprites:JSON.parse(dataOne.childSprites)
          }
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
 * @param childSprites [{
 *   basic:{basic原始素材对象},
 *   properties:{属性}
 * }]
 * @returns {Function}
 */
export function playerAdd(player){

  if(player.name &&
    player.childSprites &&
    !player.childSprites.every(({basic,properties})=>basic&&properties)){
    throw new Error('不合法的childSprites');
  }

  return (dispatch,getState)=>{

    loadSpritesImg(player.childSprites)
      .then(build)
      .then(buildResult=>{

        ajax(API.playerSave).post(Object.assign({
          type,
          name:player.name,
          childSprites:JSON.stringify(player.childSprites),
        },buildResult)).then(returnData=>{

          if(returnData.result){

            dispatch({
              type:PLAYER_ADD,
              player:Object.assign({},player,returnData.result,{
                id:returnData.result._id,
              })
            });
          }
        });
      });
  }
}

export function playerUpdate(player){

  return (dispatch,getState)=>{

    loadSpritesImg(player.childSprites)
      .then(build)
      .then(buildResult=>{

        ajax(API.playerSave).post(Object.assign({
          id:player.id,
          name:player.name,
          childSprites:JSON.stringify(player.childSprites),
        },buildResult)).then(returnData=>{

          if(returnData.result){

            dispatch({
              type:PLAYER_EDIT,
              player:Object.assign({},player,returnData.result)
            });
          }
        });
      });
  }
}