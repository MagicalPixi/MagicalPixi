require('../../../styles/game/create.scss')
// require('../../common/utils')
import Navbar from '../../../back/components/Navbar/index'
import {statics} from 'mp_common'
import Cookie from 'js-cookie'
import GameCreateInput from '../../../back/components/GameCreateInput'
import React from 'react'
import ReactDOM from 'react-dom'
import autoBind from 'react-autobind'
var axios = require('axios')
import DropZone from '../../../back/components/DropZone'
import RectImage from '../../../back/components/RectImage'
import Radio from '../../../back/components/Radio'

const ICON_UPLOADER_ID = 'icon_uploader_id'
const JS_UPLOADER_ID = 'js_uploader_id'
const AUTH_AUDIO_NAME = 'auth_auio_name'
const SCORE_TYPE_AUDIO_NAME = 'score_type_autio_name'
const NAME_INPUT_ID = 'name_input_id'
const DESC_INPUT_ID = 'desc_input_id'

const defult_game = {
  auth: false, scoreType: 0, desc: '', name: '', jsName: '', cover: '', javascrpt: ''
}

class CreateGame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      game: window.game || defult_game
    }
    autoBind(this);
  }

  submit() {
    var data = Object.assign({}, this.state.game)
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
      this.state.game.scoreType = value
    } else {
      this.state.game.auth = value
    }
  }

  onDrop(files, dropzone, id) {
    dropzone.setLoading(true)
    var file = files[0]
    console.log(file)
    if (id == JS_UPLOADER_ID) this.state.game.jsName = file.name
    require('../../../../services/mprequest').upload(file.name, file).then(value => {
      dropzone.setLoading(false)
      id == ICON_UPLOADER_ID ? this.state.game.cover = value.data.url : this.state.game.javascrpt = value.data.url
      this.setState({game: this.state.game})
      console.log(value.data)
    }).catch(reason => {
      dropzone.setLoading(false)
      dropzone.setReject(true)
      console.log(reason)
    })
  }

  handleChange(event) {
    event.id == NAME_INPUT_ID ? this.state.game.name = event.text : this.state.game.desc = event.text
    this.setState({game: this.state.game})
  }

  renderIconArea() {
    if (this.state.game.cover != "") {
      return (
        <div className="upload_container">
          <RectImage width="150" height="150" src={this.state.game.cover || ""} />
          <DropZone id={ICON_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
        </div>
      )
    } else {
      return <DropZone id={ICON_UPLOADER_ID} onDrop={this.onDrop}></DropZone>
    }
  }

  renderJSArea() {
    let icon = 'http://qiniu.magicalpixi.com/icon/js.png'
    if (this.state.game.javascrpt != "") {
      return (
        <div className="upload_container">
          <div className="js_file_container">
            <img src={icon}></img>
            <p>{this.state.game.jsName}</p>
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
      <div>
        <Navbar />
        <div className="game_info">
          <div className="container">
            <div className="inputs_container">
              <GameCreateInput onChange={this.handleChange} name="游戏名称" id={NAME_INPUT_ID} value={this.state.game.name} ></GameCreateInput>
              <div className="drop_container">
                <p className="title">游戏图标</p>
                {this.renderIconArea()}
              </div>
              <GameCreateInput onChange={this.handleChange} name="游戏描述" id={DESC_INPUT_ID} value={this.state.game.desc} ></GameCreateInput>
              <div className="audio_container">
                <p className="title">是否需要用户信息</p>
                <Radio items={auths} selected={this.state.game.auth} onSelect={this.onSelect} name={AUTH_AUDIO_NAME} />
              </div>
              <div className="audio_container">
                <p className="title">积分类型</p>
                <Radio items={types} selected={this.state.game.scoreType} onSelect={this.onSelect} name={SCORE_TYPE_AUDIO_NAME}/>
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
      </div>
    )
  }
}

ReactDOM.render(
  <CreateGame />,
  document.querySelector('#topContainer')
);
