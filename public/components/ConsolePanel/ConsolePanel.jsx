require('./ConsolePanel.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

let FloatItems = require('../FloatItems');

class ConsolePanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      list:[]
    }

    log('Console Panel:',props);
  }

  componentDidMount(){
    let {consoleTab} = this.props;

    this.props.actions.queryData(consoleTab);
  }

  changeHeader(headerState){
    this.props.actions.switchTab(headerState);
  }

  render(){
    let {consoleTab,consoleData} = this.props;

    log(this.props);

    return (
      <div id="consolePanel">
        <header>
          <ul data-state={consoleTab} className="operations " >
            <li onClick={this.changeHeader.bind(this,'material') } >精灵</li>
            <li onClick={this.changeHeader.bind(this,'action') } >动作</li>
            <li onClick={this.changeHeader.bind(this,'music') } >音乐</li>
          </ul>
        </header>
        <div className="contents">
          <FloatItems
            title="精灵"
            data={consoleData}
          />
        </div>
      </div>
    )
  }
}


module.exports = ConsolePanel;