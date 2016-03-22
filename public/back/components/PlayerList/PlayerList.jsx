require('./PlayerList.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import ItemList from '../../componentsLayout/ItemList'

import Popup from '../Popup'
import PlayerPacker from '../PlayerPacker'

var propTypes = {};

var defaultProps = {
  data:[]
};

class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.newOne = this.newOne.bind(this);
  }

  componentDidMount(){
    var {basics} = this.props;

    Popup(<PlayerPacker basics={basics}></PlayerPacker>)
  }

  newOne(){

  }

  edit(){

  }

  render() {

    var {data} = this.props;

    return (
      <div id="playerList">

        <header className="top-container">
          <h3 className="title" >高级精灵列表</h3>
          <button onClick={this.newOne} className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建高级精灵</button>
        </header>

        <ItemList>
          {data.map((player,i)=>{

            var {_id,name} = player;

            return (
              <li key={"player"+i} >
                <span>{name}</span>

                <span className="operation delete">
                  删除
                </span>

                <a className="operation" onClick={this.edit.bind(this)} href="javascript:void 0">编辑</a>

                <span className="operation" href="javascript:void 0">
                  下载
                </span>

              </li>
            )
          })}
        </ItemList>
      </div>
    )
  }
}
PlayerList.propTypes = propTypes;

PlayerList.defaultProps = defaultProps;

module.exports = PlayerList;
