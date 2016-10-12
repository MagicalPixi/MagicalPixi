import {SCENE_ID} from '../constants/sceneIdTypes'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

import getParamFromUrl from '../../../common/getParamFromUrl'

const handler = {
  [SCENE_ID](state, {id}){

    return id;
  }
};

export default reducerHandlerBuild(handler,(getParamFromUrl().id || null));