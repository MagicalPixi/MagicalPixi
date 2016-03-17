/**
 * Created by zyg on 16/1/20.
 */
import React,{Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MaterialsList from '../../components/MaterialsList/index'

import * as MaterialsActions from '../actions/materials'

class App extends Component {

  componentDidMount(){

    var {actions} = this.props;

    actions.initMaterialsList();
  }

  render(){
    let {materials,actions} = this.props;

    return (
      <div>
        <MaterialsList data={materials} actions={actions}/>
      </div>
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
    actions: bindActionCreators(MaterialsActions, dispatch)
  }
}

let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

module.exports = ConnectApp;