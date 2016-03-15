require('./SceneTitle.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import EditText from '../../componentsBasic/EditText'

class SceneTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  changeTitle(newTitle){

    if(newTitle){
      this.props.actions.sceneTitle(newTitle);
    }

  }

  render() {
    let {title} = this.props;

    return (
      <div id="sceneTitle">
        <EditText
          onSubmit={this.changeTitle.bind(this)}
          value={title}
          style={{
            width:`${title.length + 2}em`,
            fontSize:'20px'
          }}
          />

      </div>
    )
  }
}
SceneTitle.propTypes = {
  title:T.string.isRequired
};
module.exports = SceneTitle;
