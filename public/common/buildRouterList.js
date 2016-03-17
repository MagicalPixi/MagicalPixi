import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from 'react-router'

/**
 * 根据require的context, 建立react-router 路由列表，
 * @param loadContext
 * @returns {*}
 */
module.exports = (loadContext)=> {

  return loadContext.keys().filter((key)=> {
    return !/index\.js$/.test(key);
  }).map((key)=> {
    return {
      path: key.replace('./', '').replace(/\.js|\.jsx$/, ''),
      component: loadContext(key)
    }
  }).map(({path,component}, i)=> {
    return (
      <Route key={'route' + i} path={path} component={component} />
    )
  });
};