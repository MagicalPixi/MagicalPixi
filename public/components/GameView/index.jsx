require('./index.scss');

let PIXI = require('PIXI');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

let appendPixiContainer = require('../../common/appendPixiContainer');
let loadResource = require('../../common/loadResource');

let materialsPublish = require('../../js/data/materialsPublish');

let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('./../../common/previewConfig');

let dataStore = require('../../js/data/dataStore');


class GameView extends React.Component {

  constructor(props){
    super(props);

    this.sprites = [];
  }

  componentDidMount(){
    let gameView = this.refs.gameView;

    this.stage = appendPixiContainer(gameView);
  }

  componentWillUnmount(){
    this.stage.clearRender();
  }

  addSpriteToData(spriteDisplayObj){

    this.sprites.push(spriteDisplayObj);

    materialsPublish(this.sprites);
  }

  addSprite(e){
    let materialOne = JSON.parse(e.nativeEvent.dataTransfer.getData('text/plain'));

    let properties = JSON.parse(materialOne.properties);

    loadResource(materialOne.resourceUrl,(resource)=>{

      properties.textures = resource.texture || resource.textures;

      let spriteDisplayObj = spriteFnMap(materialOne.type)(properties);

      this.addSpriteToData(spriteDisplayObj);

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