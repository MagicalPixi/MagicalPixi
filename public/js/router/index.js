let React = require('react');
let {Router,Route,browserHistory} = require('react-router');
let _ = require('lodash');

let routersLoad = require.context('./',false,/\.js$/);

let routerList = _.filter(routersLoad.keys(),(key)=>{
  return !/index\.js$/.test(key);
}).map((key,i)=>{
  return {
    path:key.replace('./','').replace('.js',''),
    component:routersLoad(key)
  }
}).map(({path,component},i)=>{
  log(path);
  return (
    <Route key={'route'+i} path={path} component={component} />
  )
});

module.exports = (
  <Router history={browserHistory}>
    <route path='/'>
      {routerList}
    </route>
  </Router>
);