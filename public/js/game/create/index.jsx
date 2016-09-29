require('../../../styles/game/create.scss')
// require('../../common/utils')

let ReactDOM = require('react-dom')
let React = require('react')

import Navbar from '../../../back/components/Navbar/index'
import Info from '../../../back/components/CreateGameInfo/index'

class CreateGame extends React.Component {
  render(){
    return (
      <div>
        <Navbar />
        <Info /> 
      </div>
    )
  }
}

ReactDOM.render(
  <CreateGame />,
  document.querySelector('#topContainer')
);



