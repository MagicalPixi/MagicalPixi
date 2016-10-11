require('./RotateButton.scss');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

const T = React.PropTypes;

import Button from '../../componentsBasic/Button'

import autoBind from 'react-autobind'
var propTypes = {
  rotate:T.boolean,
  onClick:T.func.isRequired,
};

var defaultProps = {
  rotate:true
};

class RotateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  render() {

    var { rotate,onClick } = this.props;

    var text = rotate ? '竖屏' : '横屏';

    return (
      <Button onClick={onClick}>
        {text}
      </Button>
    )
  }
}
RotateButton.propTypes = propTypes;

RotateButton.defaultProps = defaultProps;

module.exports = RotateButton;
