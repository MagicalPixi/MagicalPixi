import { combineReducers } from 'redux'
import materials from './materials'
import viewData from './viewData'
import consoleTab from './consoleTab'
import consoleData from './consoleData'

export const editReducers = {
  viewData,
  consoleTab,
  consoleData
};

export const rootReducer = combineReducers({
  materials,
})

export const editReducer = combineReducers(editReducers);


