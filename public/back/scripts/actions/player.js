import {INIT_PLAYER_LIST,PLAYER_ADD,PLAYER_EDIT} from '../constants/playerTypes'

import API from '../../../libs/API'
import ajax from '../../../libs/ajax'

export function initPlayerList() {
  return (dispatch)=> {
    ajax(API.playerFind).get().then((returnData)=>{

      if(returnData.result){

        var result = returnData.result.map(dataOne=>{
          return {
            id:dataOne._id,
            name:dataOne.name,
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

    ajax(API.playerSave).post({
      name:player.name,
      childSprites:JSON.stringify(player.childSprites),
    }).then(returnData=>{

      if(returnData.result){

        dispatch({
          type:PLAYER_ADD,
          player:Object.assign({
            id:returnData.result
          },player)
        });
      }
    });
  }
}

export function playerEdit(player){

  return (dispatch,getState)=>{

    ajax(API.playerSave).post({
      id:player.id,
      name:player.name,
      childSprites:JSON.stringify(player.childSprites),
    }).then(returnData=>{

      if(returnData.result){

        dispatch({
          type:PLAYER_EDIT,
          player
        });
      }
    });
  }
}