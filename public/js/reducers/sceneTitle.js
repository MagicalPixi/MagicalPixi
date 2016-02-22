/**
 * Created by zyg on 16/2/22.
 */
import { SCENE_TITLE } from '../constants/sceneTypes'
import reducerHandlerBuild from '../../common/reducerHandlerBuild'

const handler = {

  [SCENE_TITLE](state,{title}){

    return title ? title : state;
  }
};

export default reducerHandlerBuild(handler,'新建场景名')