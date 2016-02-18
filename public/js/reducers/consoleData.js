import { CONSOLE_DATA } from '../constants/consoleTypes'

import reducerHandlerBuild from '../../common/reducerHandlerBuild'

let handler = {
  [CONSOLE_DATA]: function (state, action) {

    log(CONSOLE_DATA,state,action);

    return action.dataList ? action.dataList : state;
  }
};

export default reducerHandlerBuild(handler,[]);