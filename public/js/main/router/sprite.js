/**
 * Created by zyg on 16/1/20.
 */
import React,{Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MaterialsList from '../../layout/MaterialsList'

import * as MaterialsActions from '../../../back/scripts/actions/materials'
import * as BasicActions from '../../../back/scripts/actions/basic'
import * as PlayerActions from '../../../back/scripts/actions/player'

class App extends Component {

  componentDidMount(){

    var {actions} = this.props;

    //初始化，精灵列表
    actions.initMaterialsList();

    //初始化，原始素材列表
    actions.initBasicData();

    //合成素材们
    actions.initPlayerList();
  }

  render(){
    let {materials,basics,players,actions} = this.props;

    return (
      <div>
          <MaterialsList data={materials} basics={basics} players={players}  actions={actions}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    materials: state.materials,
    basics:state.basics,
    players:state.players
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},MaterialsActions,BasicActions,PlayerActions), dispatch),
  }
}

let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

module.exports = ConnectApp;