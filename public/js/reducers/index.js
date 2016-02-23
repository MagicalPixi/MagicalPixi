import { combineReducers } from 'redux'
import viewData from './viewData'
import consoleTab from './consoleTab'
import consoleData from './consoleData'
import scenes from './scenes'
import sceneTitle from './sceneTitle'

export const editReducers = {
  viewData,
  consoleTab,
  consoleData,
  sceneTitle
};

export const mainReducers = {
  scenes,
}

export const rootReducer = combineReducers(mainReducers);
export const editReducer = combineReducers(editReducers);


