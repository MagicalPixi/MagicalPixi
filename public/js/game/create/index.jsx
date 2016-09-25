// require('../../styles/main.scss')
// require('../../common/utils')

let ReactDOM = require('react-dom')
let React = require('react')

import Navbar from '../../../back/components/Navbar/index'

class CreateGame extends React.Component {

  render(){
    return (
      <div>
        <Navbar />
      </div>
    )
  }
}

ReactDOM.render(
  <CreateGame />,
  document.querySelector('#topContainer')
);



