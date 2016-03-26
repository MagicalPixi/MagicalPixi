require('./PlayerList.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import autoBind from 'react-autobind'

import ItemList from '../../componentsLayout/ItemList'
import Popup from '../Popup'
import PlayerPacker from '../PlayerPacker'

var propTypes = {};

var defaultProps = {
  data:[],
  basics:[],
};

class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};


    autoBind(this);
  }

  componentDidMount(){
    var {basics} = this.props;

    //this.close = Popup(<PlayerPacker onPacker={this.packerCompleted} basics={basics}></PlayerPacker>)
  }
  componentDidUpdate(){
    //var {basics} = this.props;
    //
    //if(this.close){
    //  this.close();
    //}
    //this.close = Popup(<PlayerPacker onPacker={this.packerCompleted} basics={basics}></PlayerPacker>)
  }

  packerCompleted(player){
    log(player);

    this.props.actions.playerAdd(player);
  }

  packerEditCompleted(player){

    this.props.actions.playerEdit(player);
  }

  newOne(){
    var {basics} = this.props;
    this.close = Popup(
      <PlayerPacker
        onPacker={this.packerCompleted}
        basics={basics} />
    )
  }

  edit(e){
    var selectIndex = parseInt(e.target.getAttribute('data-i'));
    var {basics,data} = this.props;

    var selectPlayer = data[selectIndex];

    this.close = Popup(
      <PlayerPacker
        player={selectPlayer}
        onPacker={this.packerEditCompleted}
        basics={basics}
        />
    )
  }

  render() {

    var {data} = this.props;

    return (
      <div id="playerList">

        <header className="top-container">
          <h3 className="title" >合成素材列表</h3>
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

                <a className="operation" data-i={i} onClick={this.edit} href="javascript:void 0">
                  编辑
                </a>

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
