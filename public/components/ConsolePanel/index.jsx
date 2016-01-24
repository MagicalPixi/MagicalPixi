require('./index.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

let headerStates = ['material','action','music'];

class ConsolePanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      headerState:'material' //action,music
    }
  }

  changeHeader(headerState){
    this.setState({
      headerState
    })
  }

  render(){
    let {headerState} = this.state;

    return (
      <div id="consolePanel">
        <header>
          <ul data-state={headerState} className="operations " >
            <li onClick={this.changeHeader.bind(this,'material') } >素材</li>
            <li onClick={this.changeHeader.bind(this,'action') } >动作</li>
            <li onClick={this.changeHeader.bind(this,'music') } >音乐</li>
          </ul>
        </header>
        <div className="contents">

        </div>
      </div>
    )
  }
}


module.exports = ConsolePanel;