/**
 * Created by zyg on 16/2/5.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ConsoleActions from '../actions/console'

let ConsolePanel = require('../../components/ConsolePanel');

class App extends Component {

  render(){
    return (
      <ConsolePanel />
    )
  }
}

function mapStateToProps(state) {
  return {
    consoleData: state.consoleData,
    consoleTab:state.consoleTab
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConsoleActions, dispatch)
  }
}


let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


module.exports = ConnectApp;