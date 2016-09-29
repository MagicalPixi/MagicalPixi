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
    }; 
    autoBind(this);
  } 
  
  render(){ 
    return ( 
      <div className="game_create_input"> 
        <p className="input_title">
          {this.props.name}
        </p>
        <input id={this.props.id} type="text" className="textfield" />
      </div> 
    ) 
  } 
} 

GameCreateInput.propTypes = propTypes; 
GameCreateInput.defaultProps = defaultProps; 
module.exports = GameCreateInput;
