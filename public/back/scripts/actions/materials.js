/**
 * Created by zyg on 16/3/16.
 */
import {MATERIAL_LIST,
  MATERIAL_TAB_SELECT,
  MATERIAL_NEW_TAB} from '../constants/materialsTypes'

import ajax from '../../../libs/ajax'
import API from '../../../libs/API'


function getMaterialList(){

  return new Promise((resolve)=>{

    ajax(API.materialsList)
      .get({}).then(resolve);
  })
}

export function initMaterialsList() {

  return (dispatch)=> {

    getMaterialList().then(function (returnData) {

        dispatch({
          type:MATERIAL_LIST,
          materials:returnData.result,
        });
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

export function materialTabSelect(tabName) {

  return {
    type:MATERIAL_TAB_SELECT,
    tabName,
  }
}

export function materialNewTab(tabName) {

  return {
    type:MATERIAL_NEW_TAB,
    tabName,
  }
}

export function materialMoveToTab(id,tabName) {

  return (dispatch)=>{

    new Promise((resolve)=>{

      ajax(API.moveSprite).post({
        id,
        toDirectory:tabName
      }).then(resolve)

    }).then(function (returnData) {
      if(returnData.success){

        return getMaterialList();
      }else{
        throw new Error('move to tab fail');
      }
    }).then(function (returnData) {

      dispatch({
        type:MATERIAL_LIST,
        materials:returnData.result,
      });
    });
  }
}