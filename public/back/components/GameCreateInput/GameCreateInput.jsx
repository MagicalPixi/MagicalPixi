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
    autoBind(this);
  }

  handleChangeEvent(event) {
    var text = event.target.value
    this.props.onChange({id: this.props.id, text: text})
  }

  render(){
    return (
      <div className="game_create_input">
        <p className="input_title">
          {this.props.name}
        </p>
        <div className="input_container">
          <input id={this.props.id} type="text" className="textfield" onChange={this.handleChangeEvent} value={this.props.value} />
        </div>
      </div>
    )
  }
}

GameCreateInput.propTypes = propTypes;
GameCreateInput.defaultProps = defaultProps;
module.exports = GameCreateInput;
