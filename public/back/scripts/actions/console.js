/**
 * Created by zyg on 16/2/5.
 */
import {SWITCH_TAB,CONSOLE_DATA} from '../constants/consoleTypes'

import * as API from '../../../libs/API'
import ajax from '../../../libs/ajax'

export function switchTab(switchTo){
  return {
    type:SWITCH_TAB,
    to:switchTo
  }
}


export function queryData(tab){

  return dispatch=>{

    ajax(API.materialsList).get().then((r)=>{
      let dataList = r.result.map(function (obj) {
          return Object.assign(obj,{
            thumbnail:obj.resourceUrl.replace('json','png')
          })
        })

      dispatch({
        type:CONSOLE_DATA,
        dataList:dataList
      });
    });

  }
}