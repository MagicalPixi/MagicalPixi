/**
 * Created by zyg on 16/3/19.
 */
import React,{Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PlayerList from '../../components/PlayerList'

import * as PlayerActions from '../actions/player'

class App extends Component {

  componentDidMount(){

    var {actions} = this.props;

    //初始化，精灵列表
    actions.initPlayerList();


  }

  render(){
    let {players,actions} = this.props;

    return (
      <div>
        <PlayerList data={players}  actions={actions} />
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
    actions: bindActionCreators(PlayerActions, dispatch),
  }
}

let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

module.exports = ConnectApp;