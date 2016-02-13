require('./EditText.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

const T = React.PropTypes;

class EditText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editState:'normal'
    }
  }

  intoEditState(e){

    this.setState({
      editState:'edit'
    })
  }
  submit(){
  }

  cancel(e){
    this.setState({
      editState:'normal'
    })

    e.preventDefault();
  }

  onChange(){

  }

  render() {
    let {editState} = this.state;
    let {style} = this.props;

    return (
      <div data-state={editState} onClick={this.props.onClick} style={style} className="edit-text">
        {this.props.value}

        <p className="operations">
          <span onClick={this.intoEditState.bind(this)} className="edit"></span>
        </p>

        <div className="edit-box">
          <input className="name" value={this.props.value} />

          <p className="action-buttons" >
            <button onClick={this.submit.bind(this)}
              className="weui_btn weui_btn_mini weui_btn_primary" >
              确定
            </button>
            <button onClick={this.cancel.bind(this)}
              className="weui_btn weui_btn_mini weui_btn_default" >
              取消
            </button>
          </p>
        </div>
      </div>
    )
  }
}

module.exports = EditText;