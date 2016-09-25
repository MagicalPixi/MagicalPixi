require('./ToolsBar.scss');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import autoBind from 'react-autobind'

var propTypes = {
  style:T.object,
  onClickItem:T.func,
};

var defaultProps = {};

class ToolsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item1Clicked:false,
    };
    autoBind(this);
  }

  clickItem(e){
    var target = e.target;

    this.setState({
      item1Clicked:!this.state.item1Clicked
    });

    this.props.onClickItem(target);
    
  }

  render() {
    
    var { style } = this.props;

    var {item1Clicked} = this.state;

    var item1Text = item1Clicked ? '横屏' : '竖屏';

    return (
      <div id="toolsBar" style={style}>
        <ul onClick={this.clickItem}>
          <li>{item1Text}</li>
        </ul>
      </div>
    )
  }
}
ToolsBar.propTypes = propTypes;

ToolsBar.defaultProps = defaultProps;

module.exports = ToolsBar;
