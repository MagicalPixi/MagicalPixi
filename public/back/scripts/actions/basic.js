import {BASIC_INIT,BASIC_ADD,BASIC_DELETE} from '../constants/basicTypes'

import API from '../../../libs/API'
import ajax from '../../../libs/ajax'

import getNoRepeatName from '../../../common/getNoRepeatName'

export function initBasicData(){

  return (dispatch) => {

    ajax(API.basicFind).get({}).then(data=>{

      let basics = data.result;

      basics = basics.map(basic=>{
        return Object.assign(basic,{
          originImgUrls:JSON.parse(basic.originImgUrls)
        });
      });

      dispatch({
        type:BASIC_INIT,
        basics
      });
    })
  }
}

/**
 * 新增一个原始材料,如果有_id,则说明是更新
 *
 * @param basic
 *    name
 *    base64
 *    pixiJson
 * @constructor
 */
export function basicAdd(basic={}){

  return (dispatch,getState)=>{

    var basicList = getState().basics.filter(basicObj=> basicObj._id !== basic._id);

    basic.name = getNoRepeatName(
      basicList.map(basicObj=>basicObj.name),
      basic.name
    );

    var param = {
      _id:basic._id,
      type:basic.type,
      name:basic.name,
      png:basic.base64,
      json:basic.pixiJson,
      originImgUrls:JSON.stringify(basic.originImgUrls)
    };

    if(['name','base64','pixiJson'].every(k=>basic[k])){

      ajax(API.basicSave)
        .post(param)
        .then(function (saveResult) {

          var {resourceUrl,_id} = saveResult.result;

          dispatch({
            type: BASIC_ADD,
            basic: Object.assign({
              _id,
              resourceUrl
            }, basic)
          });
        });
    }else{
      console.error('name,base64,pixiJson 3缺1');
    }
  };
}
/**
 * 根据 id删除一个basic素材
 * @param _id
 * @returns {Function}
 */
export function basicDelete(_id){

  return (dispatch)=>{
    ajax(API.basicDelete)
      .post({
        _id
      })
      .then((returnData)=>{
        if(returnData.result){
         dispatch({
           type:BASIC_DELETE,
           _id
         });
        }else{
          alert('删除失败');
        }
      });
  }
}