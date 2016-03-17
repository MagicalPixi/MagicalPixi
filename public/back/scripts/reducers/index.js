import { combineReducers } from 'redux'

import viewData from './viewData'
import consoleTab from './consoleTab'
import consoleData from './consoleData'
import sceneTitle from './sceneTitle'
import materials from './materials'

import scenes from './scenes'
import basics from './basics'

export const editReducers = {
  viewData,
  consoleTab,
  consoleData,
  sceneTitle,
};

export const mainReducers = {
  scenes,
  basics,
  materials,
};

export const rootReducer = combineReducers(mainReducers);
export const editReducer = combineReducers(editReducers);


