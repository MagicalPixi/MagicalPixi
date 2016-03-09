import { BASIC_INIT,BASIC_ADD} from '../constants/basic'
import reducerHandlerBuild from '../../common/reducerHandlerBuild'

const handler = {

  [BASIC_INIT](state,{basics}){
    return basics || [];
  },
  [BASIC_ADD](state,{basic}){

    return state.concat(basic);
  }
};

export default reducerHandlerBuild(handler,[]);