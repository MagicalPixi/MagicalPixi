import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE,
  CONTAINER_ADD,CONTAINER_RENAME,CONTAINER_TOP,
  CHILD_REMOVE} from '../constants/gameViewTypes'

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
  [CONTAINER_ADD] (state,action) {

    let newState = containersManager(state.slice())
      .containerAdd(action.container)
      .getContainers();

    return newState;
  },
  [CONTAINER_RENAME](state,action){
    let container = state[action.index];

    container.name = action.newName;

    return state.slice();
  },
  [CONTAINER_TOP](state,action){

    let topContainer = state[action.topIndex];

    let otherContainers = state.splice(action.topIndex,1);

    return [topContainer].concat(otherContainers);
  },
  [CHILD_REMOVE](state,action){
    state = state.slice();

    let {containerIndex,childIndex} = action;

    state[containerIndex].children.splice(childIndex,1);

    return state;
  }
};

export default function viewData(state = [],action){

  if(handler[action.type]){
    return handler[action.type](state,action)
  }

  return state;
}