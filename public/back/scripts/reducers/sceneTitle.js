/**
 * Created by zyg on 16/2/22.
 */
import { SCENE_TITLE,INIT_SCENES } from '../constants/sceneTypes'
import {INIT_SCENE} from '../constants/gameViewTypes'
import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

const handler = {

  [SCENE_TITLE](state,{title}){

    return title ? title : state;
  },
  [INIT_SCENE](state,{sceneTitle}){

    return sceneTitle ? sceneTitle : state;
  }
};

export default reducerHandlerBuild(handler,'新建场景名')