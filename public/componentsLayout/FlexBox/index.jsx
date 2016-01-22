require('./index.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');


class FlexBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      width:props.childrenWidth
    }

  }

  componentDidMount(){
    let {width} = this.state;

    _.map(Object.keys(this.refs),  (refName) => {
      let refI = parseInt(refName);
      ReactDOM.findDOMNode(this.refs[refName])
        .style.width = width[refI] + 'px';
    })
  }




  render(){
    let {width} = this.state;

    return (
      <div className="flex-box" >
      {React.Children.map(this.props.children,(child,i)=>{
        if(width[i]){
          log(child.style)
          child = React.cloneElement(child,{
            ref:`${i}c`,
          })
          log(child);
        }
        return child;
      })}
      </div>
    )
  }
}

module.exports = FlexBox;