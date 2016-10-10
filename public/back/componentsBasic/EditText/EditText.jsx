require('./EditText.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import autoBind from 'react-autobind'

const T = React.PropTypes;

var propTypes = {
  onSubmit:T.func.isRequired,
  onClick:T.func,
  value:T.string.isRequired,
  defaultValue:T.string,
  style:T.object,
};

class EditText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editState:'normal',
      value:props.value
    }
    autoBind(this);
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

    this.props.onSubmit(this.state.value);

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

  clickOn(){

    this.props.onClick && this.props.onClick();
  }

  render() {
    let {editState,value} = this.state;

    let {style,defaultValue} = this.props;

    let inputValue = value.replace(/\([\d]+\)/g,'');

    return (
      <div data-state={editState} onClick={this.clickOn} style={style} className="edit-text">

        <span className="text">{value ? value : defaultValue}</span>

        <p className="operations">
          <span onClick={this.intoEditState} className="edit"></span>
        </p>

        <div className="edit-box">
          <input ref="input" onChange={this.onChange} className="name" value={inputValue} />

          <p className="action-buttons" >
            <button onClick={this.submit}
              className="weui_btn weui_btn_mini weui_btn_primary" >
              确定
            </button>
            <button onClick={this.cancel}
              className="weui_btn weui_btn_mini weui_btn_default" >
              取消
            </button>
          </p>
        </div>
      </div>
    )
  }
}

EditText.propTypes = propTypes;

module.exports = EditText;