import { CHILD_EDIT,CHILD_EDIT_DONE} from '../constants/gameViewTypes.js'
import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

const handler = {

  [CHILD_EDIT](state,{sprite,containerIndex,childIndex}){

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