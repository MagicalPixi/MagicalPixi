require('./index.scss');

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
    ajax(API.materialsList).get().then((r)=>{

      this.setState({
        list:r.result.map(function (obj) {
          return Object.assign(obj,{
            thumbnail:obj.resourceUrl.replace('json','png')
          })
        })
      })
    });
  }

  changeHeader(headerState){
    this.props.actions.switchTab(headerState);
  }

  render(){
    let {consoleTab} = this.props;

    let items = this.state.list;

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
            data={items}
          />
        </div>
      </div>
    )
  }
}


module.exports = ConsolePanel;