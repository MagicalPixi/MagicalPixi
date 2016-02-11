/**
 * Created by zyg on 16/1/29.
 */
import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE,ADD_CONTAINER } from '../constants/gameViewTypes'

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

export function addContainer(){

  let container = new PIXI.Container();
  container.name = '未命名';

  return {
    type:ADD_CONTAINER,
    container
  }
}
