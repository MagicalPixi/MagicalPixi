/**
 * Created by zyg on 16/1/29.
 */
import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE,
  CONTAINER_ADD,CONTAINER_RENAME,CONTAINER_TOP,
  CHILD_REMOVE,CHILD_EDIT,CHILD_EDIT_TYPES,INIT_SCENE} from '../constants/gameViewTypes'

import {SCENE_ID} from '../constants/sceneIdTypes'

import API from '../../../libs/API'
import ajax from '../../../libs/ajax'

import getParamFromUrl from '../../../common/getParamFromUrl';

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

  newName = newName.replace(/\([\d]+\)/g,'');

  return {
    type:CONTAINER_RENAME,
    index,
    newName
  }
}

export function childRemove(containerIndex,childIndex){
  return {
    type:CHILD_REMOVE,
    containerIndex,
    childIndex
  }
}

export function childEdit(sprite,containerIndex,childIndex){

  return {
    type:CHILD_EDIT,
    sprite,
    containerIndex,
    childIndex,
  }
}

export function childEditProperties(newProperties,containerIndex,childIndex){

  return {
    type:CHILD_EDIT_TYPES,
    properties:newProperties,
    containerIndex,
    childIndex,
  }
}

export function saveViewData(){

  return (dispatch,getState) => {

    var {viewData,sceneId,sceneTitle} = getState();
    
    // if(!sceneId){
    //   sceneId = getParamFromUrl().id
    // }

    ajax(API.sceneSave).post({
      id:sceneId,
      sceneTitle,
      viewData:JSON.stringify(viewData)
    }).then(r=>{


      dispatch({
        type:SCENE_ID,
        id:r.result,
      })
    })
  }
}

export function outputViewData() {

  return (_,getState)=>{
    var {sceneTitle} = getState();

    if(sceneTitle){
      window.open(`/api/sceneOutput?title=${sceneTitle}`);
    }
  }
}

export function initViewData(id){

  return (dispatch,getState)=>{

    ajax(API.sceneFind).get({
      id
    }).then(data=>{

      var sceneTitle = data.result.sceneTitle;
      var viewData = JSON.parse(data.result.viewData);

      dispatch({
        type:INIT_SCENE,
        viewData,
        sceneTitle
      })
    })
  }
}

