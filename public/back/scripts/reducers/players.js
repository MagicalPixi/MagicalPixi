import {INIT_PLAYER_LIST,PLAYER_ADD,PLAYER_EDIT} from '../constants/playerTypes'

import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

const handler = {
  [INIT_PLAYER_LIST](state, action) {

    return action.players;
  },
  [PLAYER_ADD](state,action){

    return state.concat(action.player);
  },
  [PLAYER_EDIT](state,action){

    return state.map((player)=>{
      return player.id === action.player.id ? action.player : player
    });
  }
};

export default reducerHandlerBuild(handler,[]);
