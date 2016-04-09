require('./ConsolePanel.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

import autobind from 'react-autobind'

import pixiLib from 'pixi-lib'
import SpritePreview from '../SpritePreview'
import SpriteSetting from '../SpriteSetting'

var propTypes = {
  editData:T.object
};

class ConsolePanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {};

    autobind(this);
  }

  componentDidMount(){
  }

  editDone(settingProp){
    log(settingProp);

    var {consoleData,actions} = this.props;

    var {sprite,containerIndex,childIndex,} = consoleData;

    var properties = sprite.properties;

    var newProperties = Object.assign({},properties,settingProp);

    newProperties = pixiLib.fixSpriteProperties(settingProp,newProperties);

    actions.childEditProperties(newProperties,containerIndex,childIndex);
  }

  render(){
    var {consoleData} = this.props;

    var editSceneSprite = consoleData ? consoleData.sprite : null;

    return (
      <div id="consolePanel">
      {!editSceneSprite?'':
        <SpriteSetting
          actionFrames={editSceneSprite.actionFrames}
          spriteProperties={editSceneSprite.properties}
          spriteType={editSceneSprite.type}
          onChangeSetting={this.editDone}
         />
        }

      </div>
    )
  }
}


module.exports = ConsolePanel;