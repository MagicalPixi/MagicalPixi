import {CHANGE_LAYOUT_INDEX} from '../constants/gameViewLayoutIndexTypes'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

const handler = {
  [CHANGE_LAYOUT_INDEX](state, action){

    return action.toIndex;
  }
};

export default reducerHandlerBuild(handler,0);