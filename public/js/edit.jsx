require('../styles/edit.scss');
require('../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');

class Edit extends React.Component {

  render(){
    return (
      <div>
        Edit
      </div>
    )
  }
}

ReactDOM.render(
  React.createElement(Edit),
  document.querySelector('#topContainer')
);
