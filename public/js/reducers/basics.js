import { BASIC_INIT,BASIC_ADD} from '../constants/basic'
import reducerHandlerBuild from '../../common/reducerHandlerBuild'

const handler = {

  [BASIC_INIT](state,{basics}){

    return basics || [];
  },
  [BASIC_ADD](state,{basic}){

    return state.filter(basicObj=> basicObj._id !== basic._id ).concat(basic);
  }
};

export default reducerHandlerBuild(handler,[]);