require('./index.scss');

let PIXI = require('PIXI');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

let appendPixiContainer = require('../../common/appendPixiContainer');
let loadResource = require('../../common/loadResource');

let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('./../../common/previewConfig');

class GameView extends React.Component {

  constructor(props){
    super(props);

    this.sprites = [];

    this.state = {
      currentLayoutIndex:0,
      layouts:[
        new PIXI.Container()
      ]
    };

    log('GameView:',props);
  }

  componentDidMount(){
    let {layouts} = this.state;
    let gameView = this.refs.gameView;

    this.stage = appendPixiContainer(gameView);

    this.stage.addChild(layouts[0]);
  }

  componentWillUnmount(){
    this.stage.clearRender();

  }

  addLayout(){

  }

  addSprite(e){
    let materialOne = JSON.parse(e.nativeEvent.dataTransfer.getData('text/plain'));

    let properties = JSON.parse(materialOne.properties);

    let {currentLayoutIndex,layouts} = this.state;

    loadResource(materialOne.resourceUrl,(resource)=>{

      properties.textures = resource.texture || resource.textures;

      let spriteDisplayObj = spriteFnMap(materialOne.type)(properties);

      this.props.actions.addSpriteToScene(
        spriteDisplayObj,
        currentLayoutIndex
      );

      layouts[currentLayoutIndex].addChild(spriteDisplayObj);
    });
  }

  dragOver(e){
    e.preventDefault();
  }

  render(){
    return (
      <div id="gameView" ref="gameView"
        onDrop={this.addSprite.bind(this)}
        onDragOver={this.dragOver.bind(this)} >

        <div className="layouts-box">
          <ul className="layouts">
            <li>图层1</li>
            <li>图层2</li>
            <li>图层2</li>
          </ul>
          <button onclick={this.addLayout.bind(this)} className="add-layout">+</button>
        </div>
      </div>
    )
  }
}

module.exports = GameView;