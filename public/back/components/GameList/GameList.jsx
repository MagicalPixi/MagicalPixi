require('./GameList.scss');
import React,{Component} from 'react'import ReactDOM from 'react-dom'
const T = React.PropTypes;
import autoBind from 'react-autobind'var defaultProps = {
  games: []
};
class MyGameListItem extends Component {  constructor(props){    super(props);    autoBind(this);  }  render() {    console.log(this.props.game)    var imageStyle = {      backgroundImage: 'url(' + this.props.game.icon + ')'    }    return (      <div className="my_game_list_item">        <div className="item_image_view" style={imageStyle} />        <div className="item_desc">          <p className="item_title_text" > {this.props.game.name || '没有名字的游戏'} </p>          <p className="item_desc_text" > {this.props.game.desc || '这个游戏没有描述'} </p>        </div>      </div>    )  }}class MyGameList extends Component {
  constructor(props){
    super(props);
    autoBind(this);
  }

  gameList() {
    return this.props.games.map((game) => {
      return (
        <MyGameListItem game={game} />
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
