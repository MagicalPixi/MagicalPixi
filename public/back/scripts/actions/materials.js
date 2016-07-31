/**
 * Created by zyg on 16/3/16.
 */
import {MATERIAL_LIST} from '../constants/materialsTypes'

import ajax from '../../../libs/ajax'
import API from '../../../libs/API'

export function initMaterialsList() {

  return (dispatch)=> {

    ajax(API.materialsList)
      .get({})
      .then(function (returnData) {

        dispatch({
          type:MATERIAL_LIST,
          materials:returnData.result,
          
        })

      });
  }
}

export function materialSave(spriteObj){

  //防止多余信息
  delete spriteObj.properties.textures

  return (dispatch,getState)=>{
    ajax(API.saveProperties)
      .post(spriteObj)
      .then((r)=>{
        if(r.result){
          location.reload();
        }else{
          console.log();
        }
      });
  }
}