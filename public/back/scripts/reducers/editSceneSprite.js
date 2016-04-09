import { CHILD_EDIT,CHILD_EDIT_TYPES,CHILD_EDIT_DONE} from '../constants/gameViewTypes.js'
import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

const handler = {

  [CHILD_EDIT](state,{sprite,containerIndex,childIndex}){

    if(typeof sprite.properties === 'string'){
      sprite = Object.assign({},sprite,{
        properties:JSON.parse(sprite.properties)
      })
    }

    return {
      sprite,
      containerIndex,
      childIndex,
    }
  },
  [CHILD_EDIT_TYPES](state,{properties,containerIndex,childIndex}){

    var sprite = state.sprite;

    sprite = Object.assign({},sprite,{
      properties,
    });

    return {
      sprite,
      containerIndex,
      childIndex,
    }
  },
  [CHILD_EDIT_DONE](state,{}){
    return null;
  }
};

export default reducerHandlerBuild(handler,null);