/**
 * Created by zyg on 16/1/20.
 */
let React = require('react');

let SceneList = require('../../componentsLayout/ScenesList');

class Scene extends React.Component {

  render(){
    return (
      <div>
        <SceneList></SceneList>
      </div>
    )
  }
}

module.exports = Scene;