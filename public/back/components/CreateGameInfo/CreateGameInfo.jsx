require('./CreateGameInfo.scss');
import {statics} from 'mp_common'
import Cookie from 'js-cookie'
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

const ICON_UPLOADER_ID = 'icon'
const JS_UPLOADER_ID = 'js'
const AUTH_AUDIO_NAME = 'auth'
const SCORE_TYPE_AUDIO_NAME = 'scoreType'
const NAME_INPUT_ID = 'name'
const DESC_INPUT_ID = 'desc'

class  CreateGamInfo extends Component {
  constructor(props){
    super(props);
    this.data = {
      auth: false,
      scoreType: 0,
      desc: '',
      name: '',
      jsName:'',
    }
    this.state = {
      icon: "",
      js: '',
    }
    autoBind(this);
  }

  submit() {
    var data = Object.assign(this.data, this.state)
    data.owner = Cookie.get(statics.user_id)
    var create = require('../../../../services/mprequest').dbrequest('api', 'game').create
    create(data).then(value => {
      console.log(value.data)
    }).catch(reason => {
      console.log(reason.response.data)
    })
  }

  onSelect(value, name) {
    if (name == SCORE_TYPE_AUDIO_NAME) {
      this.data.scoreType = value
    } else {
      this.data.auth = value
    }
  }

  onDrop(files, dropzone, id) {
    dropzone.setLoading(true)
    var file = files[0]
    console.log(file)
    if (id == JS_UPLOADER_ID) this.data.jsName = file.name
    require('../../../../services/mprequest').upload(file.name, file).then(value => {
      dropzone.setLoading(false)
      if (id == ICON_UPLOADER_ID) {
        this.handleIconImage(value.data.url)
      } else {
        this.handleJSUpload(value.data.url)
      }
      console.log(value.data)
    }).catch(reason => {
      dropzone.setLoading(false)
      dropzone.setReject(true)
      console.log(reason)
    })
  }

  handleIconImage(url) {
    this.setState({icon: url})
  }

  handleJSUpload(url) {
    this.setState({js: url})
    console.log(url)
  }

  handleChange(event) {
    this.data[event.id] = event.text
  }

  renderIconArea() {
    if (this.state.icon != "") {
      return (
        <div className="upload_container">
          <RectImage width="150" height="150" src={this.state.icon} />
          <DropZone id={ICON_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
        </div>
      )
    } else {
      return <DropZone id={ICON_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
    }
  }

  renderJSArea() {
    let icon = 'http://qiniu.magicalpixi.com/icon/js.png'
    if (this.state.js != "") {
      return (
        <div className="upload_container">
          <div className="js_file_container">
            <img src={icon}></img>
            <p>{this.data.jsName}</p>
          </div>
          <DropZone id={JS_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
        </div>
      )
    } else {
      return <DropZone id={JS_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
    }
  }

  render(){
    let auths = [{value: true, content:"需要"}, {value: false, content: "不需要"}]
    let types = [{value: 0, content:"分数"}, {value: 1, content:"时间"}]
    return (
      <div id="createGameInfo">
        <div className="container">
          <div className="inputs_container">
            <GameCreateInput onChange={this.handleChange} name="游戏名称" id={NAME_INPUT_ID}></GameCreateInput>
            <div className="drop_container">
              <p className="title">游戏图标</p>
              {this.renderIconArea()}
            </div>
            <GameCreateInput onChange={this.handleChange} name="游戏描述" id={DESC_INPUT_ID}></GameCreateInput>
            <div className="audio_container">
              <p className="title">是否需要用户信息</p>
              <Radio items={auths} selected={this.data.auth} onSelect={this.onSelect} name={AUTH_AUDIO_NAME} />
            </div>
            <div className="audio_container">
              <p className="title">积分类型</p>
              <Radio items={types} selected={this.data.scoreType} onSelect={this.onSelect} name={SCORE_TYPE_AUDIO_NAME}/>
            </div>
            <div className="drop_container">
              <p className="title">Javascript</p>
              {this.renderJSArea()}
            </div>
          </div>
          <div className="bottom_button_area">
            <button onClick={this.submit} className="submit_button">提交</button>
          </div>
        </div>
      </div>
    )
  }
}

CreateGamInfo.propTypes = propTypes;
CreateGamInfo.defaultProps = defaultProps;
module.exports = CreateGamInfo;
