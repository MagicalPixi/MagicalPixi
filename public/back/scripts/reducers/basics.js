import { BASIC_INIT,BASIC_ADD,BASIC_DELETE} from '../constants/basicTypes'
import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

const handler = {

  [BASIC_INIT](state,{basics}){

    return basics || [];
  },
  [BASIC_ADD](state,{basic}){

    return state.filter(basicObj=> basicObj._id !== basic._id ).concat(basic);
  },
  [BASIC_DELETE](state,{_id}){
    return state.filter(basicObj=> basicObj._id !== _id);
  }
};

export default reducerHandlerBuild(handler,[]);