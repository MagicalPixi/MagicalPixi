import React from 'react'
import ReactRouter,{Router,Route,IndexRoute,browserHistory} from 'react-router'

import {mainReducers} from '../../../back/scripts/reducers'
import {routerBuild,createMyStore} from '../../../common/routerBuild'

import buildRouterList from '../../../common/buildRouterList'

import defaultRouterComponent from './scene'

var routerList = [
  <IndexRoute key="route0" component={defaultRouterComponent} />
];

var routersLoad = require.context('./',false,/\.js|\.jsx$/);

routerList = routerList.concat(buildRouterList(routersLoad));

var myStore = createMyStore(mainReducers,{
  withRouter:true,

  initialState:{
    scenes:[],
    basics:[],
    materials:{},
    players:[],
  }
});

module.exports = routerBuild(routerList,myStore);