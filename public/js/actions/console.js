/**
 * Created by zyg on 16/2/5.
 */
import {SWITCH_TAB} from '../constants/consoleTypes'

export function switchTab(switchTo){
  return {
    type:SWITCH_TAB,
    consoleTab:switchTo
  }
}