import React from 'react'
import ReactRouter,{Router,IndexRoute,Route,browserHistory} from 'react-router'

import {routerBuild} from '../../../common/routerBuild'
import buildRouterList from '../../../common/buildRouterList'

import defaultRouterComponent from './console'


let routersLoad = require.context('./',false,/\.js|\.jsx$/);

let routerList = [
  <IndexRoute key="route0" component={defaultRouterComponent} />
];

routerList = routerList.concat(buildRouterList(routersLoad));


export function createRouterList(store){

  return routerBuild(routerList,store);
}