/**
 * Created by zyg on 16/2/5.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ConsoleActions from '../actions/console'
import * as GameViewActions from '../actions/gameView'

let ConsolePanel = require('../../components/ConsolePanel/index');

class App extends Component {

  componentDidMount(){
    ConsoleActions.queryData();
  }

  render(){

    let {editSceneSprite,actions} = this.props;

    return (
      <ConsolePanel consoleData={editSceneSprite} actions={actions} />
    )
  }
}

function mapStateToProps(state) {
  return {
    consoleData: state.consoleData,
    consoleTab:state.consoleTab,
    editSceneSprite:state.editSceneSprite,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},ConsoleActions,GameViewActions), dispatch)
  }
}


let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


module.exports = ConnectApp;