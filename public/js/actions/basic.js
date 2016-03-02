import {BASIC_INIT} from '../constants/basic'

import API from '../API'
import ajax from '../../libs/ajax'

export function initSceneData(){

  return (dispatch) => {

    ajax(API.basicFind).get({
      id:0
    }).then(data=>{

      let basics = data.result;

      dispatch({
        type:INIT_SCENES,
        basics
      });
    })
  }
}