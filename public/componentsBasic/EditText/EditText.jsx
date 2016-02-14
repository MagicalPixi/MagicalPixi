require('./EditText.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

const T = React.PropTypes;

class EditText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editState:'normal',
      value:props.value
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      value:nextProps.value
    })
  }

  intoEditState(e){

    this.setState({
      editState:'edit'
    });

    e.stopPropagation();


    this.bindKeyDownFn = this.enterKeyDown.bind(this);
    document.addEventListener('keydown',this.bindKeyDownFn);
  }
  submit(e){

    this.props.onSubmit(this.state.value.replace(/\([\d]+\)/g,''));

    this.setState({
      editState:'normal'
    });

    e && e.stopPropagation();

    document.removeEventListener('keydown',this.bindKeyDownFn);
  }

  cancel(e){
    this.setState({
      editState:'normal'
    });

    e.stopPropagation();

    document.removeEventListener('keydown',this.bindKeyDownFn);
  }

  enterKeyDown(e){
    if(e.keyCode === 13){
      this.submit();
    }
  }

  onChange(){
    this.setState({
      value:this.refs.input.value
    })
  }

  render() {
    let {editState,value} = this.state;

    let {style} = this.props;

    let inputValue = value.replace(/\([\d]+\)/g,'');

    return (
      <div data-state={editState} onClick={this.props.onClick} style={style} className="edit-text">
        {this.state.value}

        <p className="operations">
          <span onClick={this.intoEditState.bind(this)} className="edit"></span>
        </p>

        <div className="edit-box">
          <input ref="input" onChange={this.onChange.bind(this)} className="name" value={inputValue} />

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

EditText.propTypes = {
  onSubmit:T.func.isRequired,
  onClick:T.func.isRequired,
  value:T.string.isRequired
};

module.exports = EditText;