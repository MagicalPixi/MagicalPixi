import {MATERIAL_LIST} from '../constants/materialsTypes'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

var handler = {
  [MATERIAL_LIST](state,action){
    return action.materials ? state : action.materials.slice();
  }
};


export default reducerHandlerBuild(handler,[])