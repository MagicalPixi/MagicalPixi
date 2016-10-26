require('../../../styles/game/my.scss')

let ReactDOM = require('react-dom')
let React = require('react')

import Navbar from '../../../back/components/Navbar/index'
import MyGameList from '../../../back/components/MyGameList/index'

class MyGames extends React.Component {
  render(){
    return (
      <div>
        <Navbar />
        <div className="title_bar">
          <p className="my_games_title">我的游戏</p>
          <a className="new_game_button" href='/game/create'>创建游戏</a>
        </div>
        <MyGameList />
      </div>
    )
  }
}

ReactDOM.render(
  <MyGames />,
  document.querySelector('#topContainer')
);
