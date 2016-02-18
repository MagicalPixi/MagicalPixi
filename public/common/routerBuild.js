import React from 'react'
import {Router,Route,browserHistory} from 'react-router'
import * as _ from 'lodash'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

export function createMyStore(reducers,{withRouter,initialState}){
  let reduxRouterMiddleware;

  let middlewares = [
    thunkMiddleware
  ];

  if(withRouter){
    let history  = createHistory();

    reduxRouterMiddleware = syncHistory(history);

    reducers = combineReducers(Object.assign({}, reducers, {
      routing: routeReducer
    }));

    middlewares.push(reduxRouterMiddleware);
  }

  let createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

  let store = createStoreWithMiddleware(reducers,initialState);

  //if (module.hot) {
  //  // Enable Webpack hot module replacement for reducers
  //  module.hot.accept('../reducers', () => {
  //    const nextReducer = require('../reducers/index')
  //    store.replaceReducer(nextReducer)
  //  })
  //}

  if(withRouter){
    reduxRouterMiddleware.listenForReplays(store)
  }

  return store;
}

export function routerBuild(routerList,store){


  //Required for replaying actions from devtools to work
  //reduxRouterMiddleware.listenForReplays(store)


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