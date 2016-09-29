require('./CreateGameInfo.scss'); 
import GameCreateInput from '../GameCreateInput'
import React,{Component} from 'react' 
import ReactDOM from 'react-dom' 
const T = React.PropTypes; 
import autoBind from 'react-autobind' 
var propTypes = { 

} 
var defaultProps = { 

} 
class  CreateGamInfo extends Component { 
  constructor(props){ 
    super(props); 
    this.state = {
  }; 
  autoBind(this);
} 
  render(){ 
    return ( 
      <div id="createGameInfo"> 
        <div className="container"> 
          <GameCreateInput name="游戏名称: " id="game_name"></GameCreateInput>
          <GameCreateInput name="游戏图标: " id="game_icon" ></GameCreateInput>
          <GameCreateInput name="游戏描述: " id="game_desc"></GameCreateInput>
          <GameCreateInput name="是否需要用户信息: " id="game_auth" ></GameCreateInput>
          <GameCreateInput name="积分类型: " id="game_score_type"></GameCreateInput>
          <GameCreateInput name="javascript地址: " id="game_js" ></GameCreateInput>
          <button className="submit_button">提交</button>
        </div>
      </div> 
    ) 
  } 
} 

CreateGamInfo.propTypes = propTypes; 
CreateGamInfo.defaultProps = defaultProps; 
module.exports = CreateGamInfo;

