import { SWITCH_TAB } from '../constants/consoleTypes'


let handler = {
  [SWITCH_TAB]: function (state = 'material', action) {
    let tab = state;

    if(['material','action','music'].indexOf(action.to) !== -1){
      tab = action.to;
    }

    return tab;
  }
};

export default function consoleTab(state = 'material', action) {

  if (handler[action.type]) {
    return handler[action.type](state, action)
  }

  return state;
}