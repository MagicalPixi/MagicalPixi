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
    this.state = {};
    autoBind(this);
  }

  clickItem(e){
    var target = e.target;

    this.props.onClickItem(target);
    
    
  }

  render() {
    
    var { style } = this.props;
    
    return (
      <div id="toolsBar" style={style}>
        <ul onClick={this.clickItem}>
          <li>旋转</li>
        </ul>
      </div>
    )
  }
}
ToolsBar.propTypes = propTypes;

ToolsBar.defaultProps = defaultProps;

module.exports = ToolsBar;
