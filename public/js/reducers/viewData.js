import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE } from '../constants/gameViewTypes'


let handler = {
  [ADD_SPRITE]: function (state,action) {

    state = state.slice().push(action.spriteObj);

    return state;
  },

  [EDIT_SPRITE]: function (state,action) {


    return state;
  }
};

export default function viewData(state = [],action){

  if(handler[action.type]){
    return handler[action.type](state,action)
  }

  return state;
}