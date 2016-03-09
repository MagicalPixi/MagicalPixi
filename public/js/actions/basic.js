import {BASIC_INIT,BASIC_ADD} from '../constants/basic'

import API from '../API'
import ajax from '../../libs/ajax'

import getNoRepeatName from '../../common/getNoRepeatName'

export function initBasicData(){

  return (dispatch) => {

    ajax(API.basicFind).get({}).then(data=>{

      let basics = data.result;

      dispatch({
        type:BASIC_INIT,
        basics
      });
    })
  }
}

/**
 * 新增一个原始材料
 *
 * @param basic
 *    name
 *    base64
 *    pixiJson
 * @constructor
 */
export function basicAdd(basic={}){

  return (dispatch,getState)=>{

    var basicList = getState().basics;

    basic.name = getNoRepeatName(
      basicList.map(basicObj=>basicObj.name),
      basic.name
    );

    var param = {
      name:basic.name,
      png:basic.base64,
      json:basic.pixiJson,
    };

    if(['name','base64','pixiJson'].every(k=>basic[k])){

      ajax(API.basicSave)
        .post(param)
        .then(function (saveResult) {

          var pngUrl = saveResult.resourceUrl.replace('.json','.png');

          dispatch({
            type: BASIC_ADD,
            basic: Object.assign({
              pngUrl
            }, basic)
          });
        });
    }else{
      console.error('name,base64,pixiJson 3缺1');
    }
  };
}