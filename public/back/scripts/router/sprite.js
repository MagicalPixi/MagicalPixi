/**
 * Created by zyg on 16/1/20.
 */
import React,{Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MaterialsList from '../../components/MaterialsList'

import * as MaterialsActions from '../actions/materials'
import * as BasicActions from '../actions/basic'

class App extends Component {

  componentDidMount(){

    var {actions} = this.props;

    //初始化，精灵列表
    actions.initMaterialsList();

    //初始化，原始素材列表
    actions.initBasicData();
  }

  render(){
    let {materials,basics,actions} = this.props;

    log('materials',materials);

    return (
      <div>
        <MaterialsList data={materials} basics={basics}  actions={actions}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    materials: state.materials,
    basics:state.basics,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},MaterialsActions,BasicActions), dispatch),
  }
}

let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

module.exports = ConnectApp;