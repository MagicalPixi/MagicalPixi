import { combineReducers } from 'redux'
import example from './example'
import materials from './materials'
import gameViewSprites from './gameViewSprites'

export const rootReducer = combineReducers({
  example,
  materials,
})

export const editReducer = combineReducers({
  gameViewSprites
})

