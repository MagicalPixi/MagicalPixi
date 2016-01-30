/**
 * Created by zyg on 16/1/29.
 */
import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE } from '../constants/gameViewTypes'

export function addSpriteToScene(spriteObj){

  return {
    type:ADD_SPRITE,
    spriteObj
  }
}

export function removeSpriteToScene(spriteObj){

  return {
    type:REMOVE_SPRITE,
    spriteObj
  }
}

export function editSpriteToScene(spriteObj){

  return {
    type:EDIT_SPRITE,
    spriteObj
  }
}
