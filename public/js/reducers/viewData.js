import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE,ADD_CONTAINER } from '../constants/gameViewTypes'

import containersManager from '../../common/pixiContainersManager'

let handler = {
  [ADD_SPRITE](state,action) {

    state = state.slice();

    state[action.containerIndex].addChild(action.spriteObj);

    return state;
  },

  [EDIT_SPRITE] (state,action) {


    return state;
  },
  [ADD_CONTAINER] (state,action) {

    let newState = containersManager(state.slice())
      .containerAdd(action.container)
      .getContainers();

    return newState;
  }
};

export default function viewData(state = [],action){

  if(handler[action.type]){
    return handler[action.type](state,action)
  }

  return state;
}