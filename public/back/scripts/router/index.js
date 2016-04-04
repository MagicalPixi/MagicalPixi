import React from 'react'
import ReactRouter,{Router,Route,IndexRoute,browserHistory} from 'react-router'
import * as _ from 'lodash'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

import {mainReducers} from '../reducers'
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
    materials:[],
    players:[],
  }
});

module.exports = routerBuild(routerList,myStore);