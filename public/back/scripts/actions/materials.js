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
          materials:returnData.result
        })

      });
  }
}