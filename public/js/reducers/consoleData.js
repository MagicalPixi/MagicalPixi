import { CONSOLE_DATA } from '../constants/consoleTypes'


let handler = {
  [CONSOLE_DATA]: function (state, action) {

    log(CONSOLE_DATA,state,action);

    return action.dataList ? action.dataList : state;
  }
};

export default function consoleData(state = [], action) {

  if (handler[action.type]) {
    return handler[action.type](state, action)
  }

  return state;
}