import {MATERIAL_LIST,
  MATERIAL_TAB_SELECT,
  MATERIAL_NEW_TAB} from '../constants/materialsTypes'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

var initDirectoryName = '未分类';

function inactiveDirectoies(state) {
  Object.keys(state).map(directory=>{

    state[directory].active = false;
  });

  return state;
}


function findActiveTabName(state) {

  var tabName = initDirectoryName;

  Object.keys(state).map(directory=>{

    if(state[directory] && state[directory].active){
      tabName = directory;
    }
  });

  return tabName;
}


var handler = {
  [MATERIAL_LIST](state,action){

    var activeTabName = findActiveTabName(state);


    var materialsMap = action.materials.map(materialObj=>{
      var obj = Object.assign({},materialObj);

      if(!obj.directory){
        obj.directory = initDirectoryName
      }
      return obj;
    }).reduce((init,next)=>{

      if(!init[next.directory]){
        init[next.directory] = {
          active: next.directory === activeTabName,
          list:[]
        };
      }

      init[next.directory].list.push(next);

      return init;

    },{
      [initDirectoryName]:null,
    });

    if(!materialsMap[initDirectoryName]){
      delete materialsMap[initDirectoryName];
    }

    return action.materials ? materialsMap : state;
  },
  [MATERIAL_TAB_SELECT](state,{tabName}){


    state = inactiveDirectoies(state);

    var newState = Object.assign({},state,{

      [tabName]:{
        active:true,
        list:state[tabName].list
      }
    });

    return newState;
  },
  [MATERIAL_NEW_TAB](state,{tabName}){
    state = inactiveDirectoies(state);

    var newState = Object.assign({},state,{

      [tabName]:{
        active:true,
        list:[]
      }
    });

    return newState;
  }
};

export default reducerHandlerBuild(handler,{})