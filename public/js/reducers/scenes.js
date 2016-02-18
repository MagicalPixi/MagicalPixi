import {INIT_SCENES,SCENE_NEW} from '../constants/sceneTypes'

import reducerHandlerBuild from '../../common/reducerHandlerBuild'

const handler = {
  [INIT_SCENES](state,action){


    log('INIT_SCENES:',action.scenes ? action.scenes : state);

    return action.scenes ? action.scenes : state;
  },
  [SCENE_NEW](state,action){

    return state;
  }
}

export default reducerHandlerBuild(handler,[])