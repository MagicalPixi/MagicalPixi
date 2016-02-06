import { combineReducers } from 'redux'
import example from './example'
import materials from './materials'
import viewData from './viewData'
import consoleTab from './consoleTab'

export const editReducers = {
  viewData,
  consoleTab
};

export const rootReducer = combineReducers({
  example,
  materials,
})

export const editReducer = combineReducers(editReducers);


