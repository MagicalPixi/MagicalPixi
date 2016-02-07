/**
 * Created by zyg on 16/1/29.
 */
import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE } from '../constants/gameViewTypes'

export function addSpriteToScene(spriteObj,layoutIndex = 0){

  return {
    type:ADD_SPRITE,
    spriteObj,
    layoutIndex
  }
}

export function removeSpriteToScene(spriteObj,layoutIndex = 0){

  return {
    type:REMOVE_SPRITE,
    spriteObj,
    layoutIndex
  }
}

export function editSpriteToScene(spriteObj,layoutIndex = 0){

  return {
    type:EDIT_SPRITE,
    spriteObj,
    layoutIndex
  }
}
