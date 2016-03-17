import {MATERIAL_LIST} from '../constants/materialsTypes'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

var handler = {
  [MATERIAL_LIST](state,action){
    return action.materials ? action.materials.slice() : state;
  }
};

export default reducerHandlerBuild(handler,[])