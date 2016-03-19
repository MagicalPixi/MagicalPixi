#!/usr/bin/env bash
newData=$1

reduxDir="public/back/scripts/"

actionJs="$reduxDir/actions/$1.js"
constantJs="$reduxDir/constants/$1Types.js"
reducerJs="$reduxDir/reducers/$1.js"

touch $actionJs
touch $constantJs
touch $reducerJs

actionTmp="import {} from '../constants/$1Types' \n\r

import API from '../../../libs/API' \n
import ajax from '../../../libs/ajax' \n\r

export function init(){ \n
  return {} \n
}\n"

constantTmp="//export const X_X = '' "

reducerTmp="import {} from '../constants/$1Types' \n\r
import reducerHandlerBuild from '../../../common/reducerHandlerBuild' \n

const handler = { \n

  [](state,action){ \n\r

    return state; \n
  } \n
}; \n\r

export default reducerHandlerBuild(handler); "


echo -e $actionTmp > $actionJs
echo -e $constantTmp > $constantTmp
echo -e $reducerTmp > $reducerJs