require('./Popup.scss');

let React = require('react');
let ReactDOM = require('react-dom');

let body = document.querySelector('body');

class Popup extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      style:props.style
    }
  }

  componentDidMount(){

    //let contentChild = this.refs.content.children[0];
    //
    //if(!contentChild){
    //  return;
    //}
    //let oldStyle = this.state.style;
    //
    ////以下一系列居中运算
    //let windowHeight = window.innerHeight;
    //
    //let childStyle = getComputedStyle(contentChild);
    //
    //let top = (parseInt(windowHeight) - parseInt(childStyle.height)) /2;
    //
    //if(top < 0){
    //  top = 10;
    //}
    //
    //let marginLeft = -parseInt(oldStyle.width) / 2;
    //
    //
    //top += 'px';
    //marginLeft += 'px';
    //
    //let newStyle = Object.assign({},{
    //  top,
    //},oldStyle);
    //
    //if(oldStyle.top !== newStyle.top || oldStyle.marginLeft !== newStyle.marginLeft){
    //  this.setState({
    //    style:newStyle
    //  });
    //}
  }

  componentDidUpdate(){

  }

  close(e){
    if(e.target.className === 'black-bg'){
      this.props.close();
    }
  }

  render() {
    return (
      <div className="popup" onClick={this.close.bind(this)}>
        <div className="black-bg"></div>
        <div ref="content" className="content" style={this.state.style}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

let container = ()=>{
  return document.createElement('div');
};

module.exports = (reactElements,style={}) => {

  let isRemoved = false;

  let div = container();
  body.appendChild(div);


  let close = ()=>{
    if(!isRemoved){
      isRemoved = true;

      ReactDOM.unmountComponentAtNode(div);
      requestAnimationFrame(()=>{
        div.remove();
      });
    }
  };


  ReactDOM.render(
    <Popup style={style} close={close}>
      {React.cloneElement(reactElements,{
        close:close
      })}
    </Popup>,
    div
  );



  return close;
};