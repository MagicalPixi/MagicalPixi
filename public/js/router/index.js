import React from 'react'
import ReactRouter,{Router,Route,browserHistory} from 'react-router'
import * as _ from 'lodash'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'
import reducers from '../reducers'

log(ReactRouter);
log(ReactRouter.browserHistory,browserHistory);

let routersLoad = require.context('./',false,/\.js|\.jsx$/);

let routerList = _.filter(routersLoad.keys(),(key)=>{
  return !/index\.js$/.test(key);
}).map((key,i)=>{
  return {
    path:key.replace('./','').replace(/\.js|\.jsx$/,''),
    component:routersLoad(key)
  }
}).map(({path,component},i)=>{
  return (
    <Route key={'route'+i} path={path} component={component} />
  )
});





let history  = createHistory();

let reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

// Sync dispatched route actions to the history
let reduxRouterMiddleware = syncHistory(history);

let createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

let store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)




module.exports = (
  <Provider store={store} >
    <Router history={browserHistory}>
      <route path='/'>
        {routerList}
      </route>
    </Router>
  </Provider>
);