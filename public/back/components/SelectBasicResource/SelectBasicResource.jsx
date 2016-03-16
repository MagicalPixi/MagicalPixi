require('./SelectBasicResource.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

var propTypes = {
  onSelect:T.func.isRequired,
  resources:T.array.isRequired
};

var defaultProps = {
  resources:[]
};

class SelectBasicResource extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="selectBasicResource">

      </div>
    )
  }
}
SelectBasicResource.propTypes = propTypes;
SelectBasicResource.defaultProps = defaultProps;

module.exports = SelectBasicResource;
