import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SceneActions from '../actions/scene'

const T = React.PropTypes;

let SceneList = require('../../components/ScenesList');

class App extends Component {

  render(){

    let {scenes,actions} = this.props;

    log('scenes:',scenes);

    return (
      <SceneList data={scenes} actions={actions} />
    )
  }
}

function mapStateToProps(state) {
  return {
    scenes: state.scenes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SceneActions, dispatch)
  }
}

let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

//class Scene extends Component {
//  constructor(props) {
//    super(props)
//    this.state = {}
//  }
//
//  render() {
//    return (
//      <Provider store={store}>
//        <ConnectApp />
//      </Provider>
//    )
//  }
//}

module.exports = ConnectApp;