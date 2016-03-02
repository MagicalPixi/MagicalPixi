require('./TexturePacker.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

class TexturePacker extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div id="texturePacker">
      </div>
    )
  }
}
TexturePacker.propTypes = {};
module.exports = TexturePacker;
