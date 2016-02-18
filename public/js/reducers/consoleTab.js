import { SWITCH_TAB } from '../constants/consoleTypes'

import reducerHandlerBuild from '../../common/reducerHandlerBuild'

let handler = {
  [SWITCH_TAB]: function (state = 'material', action) {
    let tab = state;

    if(['material','action','music'].indexOf(action.to) !== -1){
      tab = action.to;
    }

    return tab;
  }
};

export default reducerHandlerBuild(handler,'material')