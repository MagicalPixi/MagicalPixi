import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as BasicActions from '../actions/basic'

const T = React.PropTypes;

let BasicList = require('../../components/BasicList');

class App extends Component {

  componentDidMount(){

    this.props.actions.initBasicData();
  }

  render(){

    let {basics,actions} = this.props;

    return (
      <BasicList data={basics} actions={actions} />
    )
  }
}

function mapStateToProps(state) {
  return {
    basics: state.basics
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BasicActions, dispatch)
  }
}

let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

module.exports = ConnectApp;