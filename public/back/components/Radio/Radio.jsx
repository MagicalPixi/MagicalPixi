require('./Radio.scss');
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;
import autoBind from 'react-autobind'
var propTypes = {
};
var defaultProps = {
  items: []
};
class RadioItem extends Component {  constructor(props){    super(props);    this.state = {    };    autoBind(this);  }  onClick() {    if (this.props.onClick) {      this.props.onClick(this.props.value)
    }  }  renderIcon() {    if (this.props.selected) {      return <img class="radio_icon" src={this.props.icon_checked}></img>    } else {      return <img class="radio_icon" src={this.props.icon_unchecked}></img>    }  }  render(){    return (      <div onClick={this.onClick} className="mp_radio_item">        {this.renderIcon()}        <p>{this.props.content}</p>      </div>    )  }}RadioItem.defaultProps = {  icon_checked: 'http://qiniu.magicalpixi.com/icon/check_radio.png',  icon_unchecked: 'http://qiniu.magicalpixi.com/icon/uncheck_radio.png'}class Radio extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.selected    };
    autoBind(this);
  }

  select(value) {
    if (this.props.onSelect) {
      this.props.onSelect(value, this.props.name)
    }
    this.setState({
      selected: value
    })
  }

  render(){
    let children = this.props.items.map((item, index) => {
      return <RadioItem value={item.value} onClick={this.select} index={index} selected={item.value == this.state.selected} content={item.content}/>
    })
    return (
      <div className="mp_radio">
        {children}
      </div>
    )
  }
}
Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
module.exports = Radio;
