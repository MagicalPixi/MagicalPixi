require('./GameCreateInput.scss'); 
import React,{Component} from 'react' 
import ReactDOM from 'react-dom' 
const T = React.PropTypes; 
import autoBind from 'react-autobind' 

var propTypes = { 

} 
var defaultProps = { 

} 

class GameCreateInput extends Component { 
  constructor(props){ 
    super(props);
    this.state = {
      value: ''
    }
    autoBind(this);
  } 

  handleChangeEvent(event) {
    var text = event.target.value
    this.setState({value: text})
    this.props.onChange({id: this.props.id, text: text})
  }
  
  render(){ 
    return ( 
      <div className="game_create_input"> 
        <p className="input_title">
          {this.props.name}
        </p>
        <input id={this.props.id} type="text" className="textfield" value={this.state.value} onChange={this.handleChangeEvent} />
      </div> 
    ) 
  } 
} 

GameCreateInput.propTypes = propTypes; 
GameCreateInput.defaultProps = defaultProps; 
module.exports = GameCreateInput;
