require('./RectImage.scss');
 import React,{Component} from 'react'
 import ReactDOM from 'react-dom'
 const T = React.PropTypes;
 import autoBind from 'react-autobind'
 var propTypes = {
 };
 var defaultProps = {
 };
class RectImage extends Component {
  constructor(props){
    super(props);
    this.state = {
    };    autoBind(this);
  }
  render(){
    var style = {
      backgroundImage:"url(" + this.props.src + ")",
      backgroundSize: 'cover',
      width: this.props.width,
      height: this.props.height
    }
    return (
      <div className="rectImage" style={style}>
      </div>
    )
  }
}
 RectImage.propTypes = propTypes;
 RectImage.defaultProps = defaultProps;
 module.exports = RectImage;
