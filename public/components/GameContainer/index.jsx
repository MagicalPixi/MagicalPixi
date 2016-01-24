require('./index.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');


let GameView = require('../GameView/index');

class GameContainer extends React.Component {

  constructor(props){
    super(props);

  }

  render(){
    return (
      <div id="gameContainer">
      {this.props.children}
      </div>
    )
  }
}

module.exports = GameContainer;