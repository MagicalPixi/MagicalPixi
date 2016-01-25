let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

class DataContainer extends React.Component {

  render(){
    return (
      <div>
      {this.props.children}
      </div>
    )
  }
}

module.exports = DataContainer;