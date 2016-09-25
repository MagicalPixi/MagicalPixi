import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SceneActions from '../../../back/scripts/actions/scene'

import SceneList from '../../../back/components/ScenesList'

const T = React.PropTypes;

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
)(App);

module.exports = ConnectApp;