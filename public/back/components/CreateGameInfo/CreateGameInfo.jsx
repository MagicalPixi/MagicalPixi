require('./CreateGameInfo.scss'); 
import GameCreateInput from '../GameCreateInput'
import React,{Component} from 'react' 
import ReactDOM from 'react-dom' 
const T = React.PropTypes; 
import autoBind from 'react-autobind' 
import ajax from '../../../libs/ajax'
var propTypes = { 

} 
var defaultProps = { 

} 
class  CreateGamInfo extends Component { 
  constructor(props){ 
    super(props); 
    this.state = {
      game_name: '',
      game_icon: '',
      game_desc: '',
      game_auth: '',
      game_score_type: '',
      game_js: ''
    }
    autoBind(this);
  } 

  submit() {
    var url = 'http://game.magicalpixi.com/api/game'
    var data = {
      name: this.state.game_name,
      icon: this.state.game_icon,
      desc: this.state.game_desc,
      scoreType: this.state.game_score_type,
      js: this.state.game_js
    } 
    ajax(url).post(data).done(function(response) {
       console.log(response)
    })
  }

  handleChange(event) {
    this.state[event.id] = event.text
  }
  
  render(){ 
    return ( 
      <div id="createGameInfo"> 
        <div className="container"> 
          <GameCreateInput onChange={this.handleChange} name="游戏名称: " id="game_name"></GameCreateInput>
          <GameCreateInput onChange={this.handleChange} name="游戏图标: " id="game_icon" ></GameCreateInput>
          <GameCreateInput onChange={this.handleChange} name="游戏描述: " id="game_desc"></GameCreateInput>
          <GameCreateInput onChange={this.handleChange} name="是否需要用户信息: " id="game_auth" ></GameCreateInput>
          <GameCreateInput onChange={this.handleChange} name="积分类型: " id="game_score_type"></GameCreateInput>
          <GameCreateInput onChange={this.handleChange} name="javascript地址: " id="game_js" ></GameCreateInput>
          <button onClick={this.submit} className="submit_button">提交</button>
        </div>
      </div> 
    ) 
  } 
} 

CreateGamInfo.propTypes = propTypes; 
CreateGamInfo.defaultProps = defaultProps; 
module.exports = CreateGamInfo;

