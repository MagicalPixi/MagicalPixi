require('./index.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

class ConsolePanel extends React.Component {

  constructor(props){
    super(props);

  }

  render(){
    return (
      <div id="consolePanel">

      </div>
    )
  }
}


module.exports = ConsolePanel;