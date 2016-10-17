require('./CreateGameInfo.scss');
import GameCreateInput from '../GameCreateInput'
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import autoBind from 'react-autobind'
var axios = require('axios')
import DropZone from '../DropZone'
import RectImage from '../RectImage'
const T = React.PropTypes;
var propTypes = {
}
var defaultProps = {
}

class  CreateGamInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      icon: ""
    }
    autoBind(this);
  }

  submit() {

  }

  onDrop(files, dropzone) {
    dropzone.setLoading(true)
    var file = files[0]
    var FormData = require('form-data')
    var data = new FormData()
    data.append('file', file)
    axios.post('http://db.magicalpixi.com/upload?name=' + file.name, data).then(value => {
      dropzone.setLoading(false)
      this.setState({icon: value.data.url})
      console.log(value.data.url)
    }).catch(reason => {
      dropzone.setLoading(false)
      console.log(reason.response.data)
    })
    console.log(files)
  }

  handleChange(event) {
    this.state[event.id] = event.text
  }

  render(){
    return (
      <div id="createGameInfo">
        <div className="container">
          <div className="inputs_container">
            <GameCreateInput onChange={this.handleChange} name="游戏名称" id="game_name"></GameCreateInput>
            <div className="drop_container">
              <p className="title">游戏图标</p>
              <DropZone onDrop={this.onDrop}></DropZone>
            </div>
            <RectImage width="150" height="150" src={this.state.icon} />
            <GameCreateInput onChange={this.handleChange} name="游戏描述" id="game_desc"></GameCreateInput>
            <GameCreateInput onChange={this.handleChange} name="是否需要用户信息" id="game_auth" ></GameCreateInput>
            <GameCreateInput onChange={this.handleChange} name="积分类型" id="game_score_type"></GameCreateInput>
            <div className="drop_container">
              <p className="title">Javascript</p>
              <DropZone onDrop={this.onDrop}></DropZone>
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
