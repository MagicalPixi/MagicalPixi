require('./EditOperations.scss')

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

const T = React.PropTypes;

import autoBind from 'react-autobind'

import Button from '../../componentsBasic/Button'

class EditOperations extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    autoBind(this);
  }

  saveScene(){

    this.props.onSave();
  }

  output(){

    var {disabledOutput} = this.props;

    if(!disabledOutput){
      this.props.onOutput();
    }
  }

  render() {

    var {disabledOutput} = this.props;

    var buttonType = disabledOutput ? 'disabled' : 'default';

    return (
      <div id="editOperations">
        <Button onClick={this.output} type={buttonType}>
          发布
        </Button>
        <Button onClick={this.saveScene}>
          保存
        </Button>
      </div>
    )
  }
}

EditOperations.defaultProps = {
  disabledOutput:true,
}

EditOperations.propTypes = {
  onSave:T.func,
  onOutput:T.func,
  disabledOutput:T.bool,
};

module.exports = EditOperations;