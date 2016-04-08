require('./ConsolePanel.scss');

let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

let FloatItems = require('../FloatItems/index');

import SpritePreview from '../SpritePreview'

var propTypes = {
  editData:T.object
};

class ConsolePanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };

    log('Console Panel:',props);
  }

  componentDidMount(){
  }

  editDone(){

  }

  render(){
    var {consoleData} = this.props;

    var editSceneSprite = consoleData ? consoleData.sprite : null;


    return (
      <div id="consolePanel">
      {!editSceneSprite?'':
        <SpritePreview
          sprite = {editSceneSprite}
          resourceUrl = {editSceneSprite.resourceUrl}
          properties={editSceneSprite.properties}
          type={editSceneSprite.type}
          onSubmit={this.editDone}
          closePreview={true}
         />
        }

      </div>
    )
  }
}


module.exports = ConsolePanel;