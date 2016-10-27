require('../../../styles/game/my.scss')

let ReactDOM = require('react-dom')
let React = require('react')

import autoBind from 'react-autobind'
import {dbrequest} from '../../../../services/mprequest'
import Cookie from 'js-cookie'
import {statics} from 'mp_common'
import Navbar from '../../../back/components/Navbar/index'
import GameList from '../../../back/components/GameList/index'

class MyGames extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      games: []
    }
      autoBind(this);
  }

  componentDidMount() {
    this.fetchGames()
  }

  fetchGames() {
    var req = dbrequest('api', 'games')
    req.get({owner: Cookie.get(statics.user_id)}).then(value => {
      if (value.data.result.forEach) {
        this.setState({games: value.data.result})
      }
    }).catch(reason => {
      console.log(reason)
    })
  }

  removeGame(game) {

  }

  render(){
    return (
      <div>
        <Navbar />
        <div className="title_bar">
          <p className="my_games_title">我的游戏</p>
          <a className="new_game_button" href='/game/create'>创建游戏</a>
        </div>
        <GameList games={this.state.games} delete={this.removeGame} />
      </div>
    )
  }
}

ReactDOM.render(
  <MyGames />,
  document.querySelector('#topContainer')
);
