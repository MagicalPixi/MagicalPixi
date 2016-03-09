let React = require('react');
let T = React.PropTypes;
let _ = require('lodash');

let ajax = require('../libs/ajax');

let API = require('../js/API');

class DeleteSprite extends React.Component {


  deleteSprite(){

    if(!confirm('确认删除')){
      return;
    }

    ajax(API.deleteSprite).get(this.props.data).then(function (r) {
      log(r);
      setTimeout(function () {
        location.reload();
      },500)
    })
  }

  render(){
    return (
      <a onClick={this.deleteSprite.bind(this)} href="javascript:void 0">
      {this.props.children}
      </a>
    )
  }
}

DeleteSprite.propTypes = {
  data:T.object.isRequired
};

module.exports = DeleteSprite;