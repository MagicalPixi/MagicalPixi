/**
 * Created by zyg on 16/1/29.
 */
import * as types from '../constants/MaterialTypes'

export function addScene(){
  return {
    type:types.Add_SCENE
  }
}

export function editScene(){
  return {
    type:types.EDIT_SCENE

  }
}