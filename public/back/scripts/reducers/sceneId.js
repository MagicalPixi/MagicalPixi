import {SCENE_ID} from '../constants/sceneIdTypes'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'
const handler = {
  [SCENE_ID](state, {id}){

    return id;
  }
};

export default reducerHandlerBuild(handler);
