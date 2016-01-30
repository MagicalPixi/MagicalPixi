import React from 'react'
import {Router,Route,browserHistory} from 'react-router'
import * as _ from 'lodash'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'


export default function routerBuild(routerList,reducers){

  let history  = createHistory();

  let reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
  }));

  // Sync dispatched route actions to the history
  let reduxRouterMiddleware = syncHistory(history);

  let createStoreWithMiddleware = applyMiddleware(
    thunk,
    reduxRouterMiddleware
  )(createStore);

  let store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store)

  return (
    <Provider store={store} >
      <Router history={browserHistory}>
        <route path='/'>
        {routerList}
        </route>
      </Router>
    </Provider>
  )
}