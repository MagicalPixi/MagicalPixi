require('./GameList.scss');
import React,{Component} from 'react'import ReactDOM from 'react-dom'
const T = React.PropTypes;
import autoBind from 'react-autobind'var defaultProps = {
  games: []
};
class MyGameListItem extends Component {  constructor(props){    super(props);    autoBind(this);  }  clickDeleteIcon() {    if (this.props.delete) {      this.props.delete(this.props.game)    }  }  render() {    var imageStyle = {      backgroundImage: 'url(' + this.props.game.cover + ')'    }    var editUrl = '/game/create/' + this.props.game.id    var infoUrl = '/game/' + this.props.game.id    return (      <div className="my_game_list_item">        <div className="item_image_view" style={imageStyle} />        <div className="item_desc">          <p className="item_title_text" > {this.props.game.name || '没有名字的游戏'} </p>          <p className="item_desc_text" > {this.props.game.desc || '这个游戏没有描述'} </p>        </div>        <div className="operation_area">          <a className="operation_icon edit_icon" href={editUrl} />          <a className="operation_icon info_icon" href={infoUrl} />          <div className="operation_icon delete_icon" onClick={this.clickDeleteIcon}/>        </div>      </div>    )  }}class MyGameList extends Component {
  constructor(props){
    super(props);
    autoBind(this);
  }
  gameList() {
    return this.props.games.map((game) => {
      return (
        <MyGameListItem game={game} delete={this.props.delete} />
      )
    })
  }

  render(){
    return (
      <div id="myGameList">
        {this.gameList()}
      </div>
    )
  }
}
MyGameList.defaultProps = defaultProps;
module.exports = MyGameList;
