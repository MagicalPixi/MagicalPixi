import { combineReducers } from 'redux'
import viewData from './viewData'
import consoleTab from './consoleTab'
import consoleData from './consoleData'
import sprites from './sprites'
import scenes from './scenes'

export const editReducers = {
  viewData,
  consoleTab,
  consoleData
};

export const mainReducers = {
  scenes,
  //sprites,
}

export const rootReducer = combineReducers(mainReducers);
export const editReducer = combineReducers(editReducers);


