require('../../../styles/game/info.scss')

import React from 'react'
import ReactDOM from 'react-dom'
import autoBind from 'react-autobind'
import Navbar from '../../../back/components/Navbar/index'

class Info extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    autoBind(this);
  }
  render(){
    return (
      <div>
        <Navbar />
        <div className="game_info_container">
          <div className="game_cover" />
          <p className="game_name">这是一个名字</p>
          <div></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Info />,
  document.querySelector('#topContainer')
);
