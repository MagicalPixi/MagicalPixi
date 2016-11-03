require('./GameList.scss');
import React,{Component} from 'react'
const T = React.PropTypes;
import autoBind from 'react-autobind'
  games: []
};

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
