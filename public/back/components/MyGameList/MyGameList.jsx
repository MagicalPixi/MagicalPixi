require('./MyGameList.scss');
import React,{Component} from 'react'import ReactDOM from 'react-dom'
const T = React.PropTypes;
import autoBind from 'react-autobind'import {dbrequest} from '../../../../services/mprequest'import Cookie from 'js-cookie'import {statics} from 'mp_common'var propTypes = {
};
var defaultProps = {
};
class MyGameListItem extends Component {  constructor(props){    super(props);    autoBind(this);  }  render() {    console.log(this.props.game)    var imageStyle = {      backgroundImage: 'url(' + this.props.game.icon + ')'    }    return (      <div className="my_game_list_item">        <div className="item_image_view" style={imageStyle} />        <div className="item_desc">          <p className="item_title_text" > {this.props.game.name || '没有名字的游戏'} </p>          <p className="item_desc_text" > {this.props.game.desc || '这个游戏没有描述'} </p>        </div>      </div>    )  }}class MyGameList extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: []    };
    autoBind(this);
  }
  componentDidMount() {
    this.fetchGames()
  }

  fetchGames() {
    var req = dbrequest('api', 'games')
    req.get({owner: Cookie.get(statics.user_id)}).then(value => {
      if (value.data.result.forEach) {
        this.setState({games: value.data.result})
      }
    }).catch(reason => {
      console.log(reason)
    })
  }

  gameList() {
    return this.state.games.map((game) => {
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
MyGameList.propTypes = propTypes;
MyGameList.defaultProps = defaultProps;
module.exports = MyGameList;
