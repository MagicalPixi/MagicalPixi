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
    return (
      <SceneList></SceneList>
    )
  }
}

function mapStateToProps(state) {
  return {
    materials: state.materials
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