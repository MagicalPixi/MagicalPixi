require('./Button.scss');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import autoBind from 'react-autobind'
var propTypes = {
  type:T.string,
  onClick:T.func,
};

var defaultProps = {
  type:'default'
};

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    var {type,onClick} = this.props;

    var c = `weui_btn weui_btn_mini weui_btn_${type}`;

    return (
      <button className={c} onClick={onClick}>
        {this.props.children}
      </button>
    )
  }
}
Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

module.exports = Button;
