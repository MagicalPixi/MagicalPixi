/**
 * Created by zyg on 16/1/29.
 */
import {ADD_MATERIAL,DEL_MATERIAL } from '../constants/materialsTypes'

export function addScene(){
  return {
    type:ADD_MATERIAL
  }
}

export function editScene(){
  return {
    type:DEL_MATERIAL
  }
}