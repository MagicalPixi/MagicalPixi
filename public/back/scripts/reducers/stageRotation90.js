import {ROTATE_GAME} from '../constants/stageRotation90Types'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

/**
 * true,表示横屏,false表示竖屏
 * @type {{}}
 */
const handler = {
  [ROTATE_GAME](state, action){

    return !state;
  }
};

export default reducerHandlerBuild(handler,true);
