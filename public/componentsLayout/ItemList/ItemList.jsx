require('./ItemList.scss');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

class ItemList extends React.Component {


  render(){
    return (
      <div id="itemList">
        <ul className="item-list" >
        {this.props.children}
        </ul>
      </div>
    )
  }
}

module.exports = ItemList;