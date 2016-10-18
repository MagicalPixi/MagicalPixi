require('./CreateGameInfo.scss');
import GameCreateInput from '../GameCreateInput'
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import autoBind from 'react-autobind'
var axios = require('axios')
import DropZone from '../DropZone'
import RectImage from '../RectImage'
import Radio from '../Radio'

const T = React.PropTypes;

var propTypes = {
}
var defaultProps = {
}

const ICON_UPLOADER_ID = 'icon_uploader_id'
const JS_UPLOADER_ID = 'js_uploader_id'

class  CreateGamInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      icon: "",
    }
    autoBind(this);
  }

  submit() {

  }

  onDrop(files, dropzone, id) {
    dropzone.setLoading(true)
    var file = files[0]
    var FormData = require('form-data')
    var data = new FormData()
    console.log(file)
    data.append('file', file)
    axios.post('http://db.magicalpixi.com/upload?name=' + file.name, data).then(value => {
      dropzone.setLoading(false)
      console.log(id)
      if (id == ICON_UPLOADER_ID) {
        handleIconImage(value.data.url)
      }
      console.log(value.data.url)
    }).catch(reason => {
      dropzone.setLoading(false)
      dropzone.setReject(true)
      console.log(reason.response.data)
    })
  }

  handleIconImage(url) {
    this.setState({icon: url})
  }

  handleChange(event) {
    this.state[event.id] = event.text
  }

  renderIconArea() {
    if (this.state.icon != "") {
      return (
        <div className="icon_container">
          <RectImage width="150" height="150" src={this.state.icon} />
          <DropZone id={ICON_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
        </div>
      )
    } else {
      return <DropZone id={ICON_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
    }
  }

  render(){
    let items = [{value: true, content:"需要"}, {value: false, content: "不需要"}]
    return (
      <div id="createGameInfo">
        <div className="container">
          <div className="inputs_container">
            <GameCreateInput onChange={this.handleChange} name="游戏名称" id="game_name"></GameCreateInput>
            <div className="drop_container">
              <p className="title">游戏图标</p>
              {this.renderIconArea()}
            </div>
            <GameCreateInput onChange={this.handleChange} name="游戏描述" id="game_desc"></GameCreateInput>
            <div className="auth_container">
              <p className="title">是否需要用户信息</p>
              <Radio items={items}/>
            </div>
            <GameCreateInput onChange={this.handleChange} name="积分类型" id="game_score_type"></GameCreateInput>
            <div className="drop_container">
              <p className="title">Javascript</p>
              <DropZone id={JS_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
            </div>
          </div>
          <button onClick={this.submit} className="submit_button">提交</button>
        </div>
      </div>
    )
  }
}

CreateGamInfo.propTypes = propTypes;
CreateGamInfo.defaultProps = defaultProps;
module.exports = CreateGamInfo;
