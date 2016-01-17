
let React = require('react');

class List extends React.Component {


  render(){
    return (
      <ul className="components-list" >
        {this.props.children}
      </ul>
    )
  }
}


module.exports = List;