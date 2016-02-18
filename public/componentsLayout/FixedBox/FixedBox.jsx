let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

class FixedBox extends React.Component {


  constructor(props){
    super(props);

    let keys = ['top','right','bottom','left'];

    this.state = {
      style:Object.assign({
        position:'fixed',
        top:0,
        right:0,
        left:0,
        bottom:0
      },_.filter(keys,k=>{
        return !!props[k]
      }).map(k=>{
        return {
          [k]:props[k]
        }
      }).reduce((init,next)=>{
        return Object.assign(init,next)
      },{}))
    };
  }

  render(){
    return (
      <div style={this.state.style}>
      {this.props.children}
      </div>
    )
  }
}

module.exports = FixedBox;