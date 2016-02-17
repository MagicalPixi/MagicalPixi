/**
 * Created by zyg on 16/1/29.
 */
import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE,
  CONTAINER_ADD,CONTAINER_RENAME,CONTAINER_TOP,
  CHILD_REMOVE} from '../constants/gameViewTypes'


import API from '../API'
import ajax from '../../libs/ajax'


export function addSpriteToScene(spriteObj,containerIndex = 0){

  return {
    type:ADD_SPRITE,
    spriteObj,
    containerIndex
  }
}

export function removeSpriteToScene(spriteObj,containerIndex = 0){

  return {
    type:REMOVE_SPRITE,
    spriteObj,
    containerIndex
  }
}

export function editSpriteToScene(spriteObj,containerIndex = 0){

  return {
    type:EDIT_SPRITE,
    spriteObj,
    containerIndex
  }
}

export function containerAdd(){

  let container = {
    name:'未命名',
    children:[]
  };

  return {
    type:CONTAINER_ADD,
    container
  }
}

export function containerRename(index,newName){

  return {
    type:CONTAINER_RENAME,
    index,
    newName
  }
}

export function containerTop(topIndex = 0){

  return {
    type:CONTAINER_TOP,
    topIndex
  }
}

export function childRemove(containerIndex,childIndex){
  return {
    type:CHILD_REMOVE,
    containerIndex,
    childIndex
  }
}

export function saveViewData(){

  return (dispatch,getState) => {

    var viewData = getState().viewData;


    ajax(API.sceneSave).post({
      id:'56c49025fd582e3823061a92',
      viewData:JSON.stringify(viewData)
    }).then(r=>{
      log('save r:',r);
    })
  }
}