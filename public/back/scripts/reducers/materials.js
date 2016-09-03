import {MATERIAL_LIST,MATERIAL_TAB_SELECT} from '../constants/materialsTypes'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

var initDirectoryName = '未命名';

var handler = {
  [MATERIAL_LIST](state,action){

    var materialsMap = action.materials.map(materialObj=>{
      var obj = Object.assign({},materialObj);

      if(!obj.directory){
        obj.directory = initDirectoryName
      }
      return obj;
    }).reduce((init,next)=>{

      if(!init[next.directory]){
        init[next.directory] = {
          active:false,
          list:[]
        };
      }

      init[next.directory].list.push(next);

      return init;

    },{
      [initDirectoryName]:null,
    });

    materialsMap[initDirectoryName].active = true;

    if(!materialsMap[initDirectoryName]){
      delete materialsMap[initDirectoryName];
    }

    return action.materials ? materialsMap : state;
  },
  [MATERIAL_TAB_SELECT](state,{tabName}){

    Object.keys(state).map(directory=>{

      state[directory].active = false;
    })

    var newState = Object.assign({},state,{

      [tabName]:{
        active:true,
        list:state[tabName].list
      }
    });

    return newState;
  }
};

export default reducerHandlerBuild(handler,{})