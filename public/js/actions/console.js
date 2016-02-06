/**
 * Created by zyg on 16/2/5.
 */
import {SWITCH_TAB} from '../constants/consoleTypes'

export function switchTab(switchTo){
  return {
    type:SWITCH_TAB,
    to:switchTo
  }
}

let API = require('../js/API');

let ajax = require('../../libs/ajax');

export function queryData(tab){

  return dispatch=>{

    ajax(API.materialsList).get().then((r)=>{
      let dataList = r.result.map(function (obj) {
          return Object.assign(obj,{
            thumbnail:obj.resourceUrl.replace('json','png')
          })
        })

      dispatch(dataList);
    });

  }
}