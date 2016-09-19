require('./EditOperations.scss')

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

const T = React.PropTypes;

import { saveViewData } from '../../scripts/actions/gameView'



import autoBind from 'react-autobind'


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

    var downClassName = 'weui_btn weui_btn_mini ' + (disabledOutput ? 'weui_btn_disabled' : 'weui_btn_default')

    return (
      <div id="editOperations">
        <button onClick={this.output} className={downClassName}>下载</button>
        <button onClick={this.saveScene} className="weui_btn weui_btn_mini weui_btn_default ">保存</button>
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