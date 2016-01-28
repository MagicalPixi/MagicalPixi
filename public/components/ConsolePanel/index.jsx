require('./index.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

let headerStates = ['material','action','music'];

let FloatItems = require('../FloatItems');

let API = require('../../js/API');

let ajax = require('../../libs/ajax');

class ConsolePanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      headerState:'material', //action,music
      list:[]
    }
  }

  componentDidMount(){
    ajax(API.materialsList).get().then((r)=>{

      log('r,',r);

      this.setState({
        list:r.result.map(function (obj) {
          return Object.assign(obj,{
            thumbnail:obj.resourceUrl
          })
        })
      })
    });
  }

  changeHeader(headerState){
    this.setState({
      headerState
    })
  }

  render(){
    let {headerState} = this.state;

    let items = this.state.list;

    return (
      <div id="consolePanel">
        <header>
          <ul data-state={headerState} className="operations " >
            <li onClick={this.changeHeader.bind(this,'material') } >精灵</li>
            <li onClick={this.changeHeader.bind(this,'action') } >动作</li>
            <li onClick={this.changeHeader.bind(this,'music') } >音乐</li>
          </ul>
        </header>
        <div className="contents">
          <FloatItems
            title="精灵"
            data={items}
          />
        </div>
      </div>
    )
  }
}


module.exports = ConsolePanel;