require('./index.scss');

let PIXI = require('PIXI');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

let appendPixiContainer = require('../../common/appendPixiContainer');
let loadResource = require('../../common/loadResource');

let materialsPublish = require('../../js/data/materialsPublish');

let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('./../../common/previewConfig');

class GameView extends React.Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
    let gameView = this.refs.gameView;

    this.stage = appendPixiContainer(gameView);
  }

  componentWillUnmount(){
    this.stage.clearRender();
  }

  addSprite(e){
    let materialOne = JSON.parse(e.nativeEvent.dataTransfer.getData('text/plain'));

    log('parse:',materialOne);

    let properties = JSON.parse(materialOne.properties);

    publish('materialsList',materialOne);

    loadResource(materialOne.resourceUrl,(resource)=>{

      properties.textures = resource.texture || resource.textures;

      let spriteDisplayObj = spriteFnMap(materialOne.type)(properties);

      this.stage.addChild(spriteDisplayObj);
    });
  }

  dragOver(e){
    e.preventDefault();
  }

  render(){
    return (
      <div id="gameView" ref="gameView" onDragOver={this.dragOver.bind(this)} onDrop={this.addSprite.bind(this)} >
      </div>
    )
  }
}

module.exports = GameView;