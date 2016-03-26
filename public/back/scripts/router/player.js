/**
 * Created by zyg on 16/3/19.
 */
import React,{Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PlayerList from '../../components/PlayerList'

import * as PlayerActions from '../actions/player'
import * as BasicActions from '../actions/basic'

class App extends Component {

  componentDidMount(){

    var {actions} = this.props;

    //初始化，精灵列表
    actions.initPlayerList();

    //初始化，原始素材列表
    actions.initBasicData();
  }

  render(){
    let {players,basics,actions} = this.props;

    return (
      <div>
        <PlayerList data={players} basics={basics} actions={actions} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    players: state.players,
    basics:state.basics,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},PlayerActions,BasicActions),
      dispatch
    ),
  }
}

let ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

module.exports = ConnectApp;