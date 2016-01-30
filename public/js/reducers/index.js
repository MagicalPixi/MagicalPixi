import { combineReducers } from 'redux'
import todos from './todos'
import materials from './materials'
import gameViewSprites from './gameViewSprites'

export const rootReducer = combineReducers({
  todos,
  materials,
})

export const editReducer = combineReducers({
  gameViewSprites
})

