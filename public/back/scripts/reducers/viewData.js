import { ADD_SPRITE,REMOVE_SPRITE,EDIT_SPRITE,
  CONTAINER_ADD,CONTAINER_RENAME,CONTAINER_TOP,
  CHILD_REMOVE,INIT_SCENE,CHILD_EDIT_TYPES} from '../constants/gameViewTypes'

import containersManager from '../../../common/pixiContainersManager'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

let handler = {
  [ADD_SPRITE](state,action) {

    state = state.slice();

    state[action.containerIndex].children.push(action.spriteObj);

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
  },
  [INIT_SCENE](state,action){

    return action.viewData;
  },
  [CHILD_EDIT_TYPES](state,{properties,containerIndex,childIndex}){

    var viewData = state.slice();

    var spriteObj = viewData[containerIndex].children[childIndex];

    spriteObj = Object.assign({},spriteObj,{
      properties
    });

    viewData[containerIndex].children[childIndex] = spriteObj;

    return viewData;
  }
};


export default reducerHandlerBuild(handler,[])