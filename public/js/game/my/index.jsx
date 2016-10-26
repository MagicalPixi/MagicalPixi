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
        <MyGameList />
      </div>
    )
  }
}

ReactDOM.render(
  <MyGames />,
  document.querySelector('#topContainer')
);
