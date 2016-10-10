import {CHANGE_LAYOUT_INDEX} from '../constants/gameViewLayoutIndexTypes'


export function layoutIndexChange(toIndex) {
  return {
    type: CHANGE_LAYOUT_INDEX,
    toIndex
  }
}

