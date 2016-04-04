require('./SelectResource.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import autoBind from 'react-autobind'
var propTypes = {};

var defaultProps = {};

class SelectResource extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  render() {
    return (
      <div id="selectResource">

        <ul className="tabs">

          <li>
            <img src="/images/example.jpg" />
          </li>

        </ul>

      </div>
    )
  }
}
SelectResource.propTypes = propTypes;

SelectResource.defaultProps = defaultProps;

module.exports = SelectResource;
