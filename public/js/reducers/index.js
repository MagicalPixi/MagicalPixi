import { combineReducers } from 'redux'
import todos from './todos'
import materials from './materials'

const rootReducer = combineReducers({
  todos,
  materials
})

export default rootReducer
