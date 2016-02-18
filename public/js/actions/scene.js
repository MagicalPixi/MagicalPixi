/**
 * Created by zyg on 16/1/29.
 */
import {INIT_SCENES,SCENE_NEW } from '../constants/sceneTypes'

import API from '../API'
import ajax from '../../libs/ajax'

export function initSceneData(){

  return (dispatch) => {

    ajax(API.sceneFind).get({
      id:0
    }).then(data=>{

      let scenes = data.result;

      dispatch({
        type:INIT_SCENES,
        scenes
      })
    })
  }
}

export function sceneNew(){
  return {
    type:SCENE_NEW
  }
}