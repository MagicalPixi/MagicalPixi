import { combineReducers } from 'redux'

import viewData from './viewData'
import consoleTab from './consoleTab'
import consoleData from './consoleData'
import sceneTitle from './sceneTitle'
import editSceneSprite from './editSceneSprite'
import gameViewLayoutIndex from './gameViewLayoutIndex'

import scenes from './scenes'
import basics from './basics'
import materials from './materials'
import players from './players'

export const editReducers = {
  gameViewLayoutIndex,
  viewData,
  consoleTab,
  consoleData,
  sceneTitle,
  editSceneSprite,
};

export const mainReducers = {
  scenes,
  basics,
  materials,
  players,
};

export const rootReducer = combineReducers(mainReducers);
export const editReducer = combineReducers(editReducers);


