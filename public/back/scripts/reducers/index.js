import { combineReducers } from 'redux'

import viewData from './viewData'
import consoleTab from './consoleTab'
import consoleData from './consoleData'
import sceneTitle from './sceneTitle'
import editSceneSprite from './editSceneSprite'
import gameViewLayoutIndex from './gameViewLayoutIndex'
import stageRotation90 from './stageRotation90'
import sceneId from './sceneId'

import scenes from './scenes'
import basics from './basics'
import materials from './materials'
import players from './players'

export const editReducers = {
  viewData,
  consoleTab,
  consoleData,
  sceneTitle,
  editSceneSprite,
  gameViewLayoutIndex,
  stageRotation90,
  sceneId,
};

export const mainReducers = {
  scenes,
  basics,
  materials,
  players,
};

export const rootReducer = combineReducers(mainReducers);
export const editReducer = combineReducers(editReducers);


