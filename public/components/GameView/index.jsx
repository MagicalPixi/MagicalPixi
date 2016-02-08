require('./index.scss');
require("../../styles/wedget/button.css");

let PIXI = require('PIXI');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

let appendPixiContainer = require('../../common/appendPixiContainer');
let loadResource = require('../../common/loadResource');

let CascadeList = require('./CascadeList');

let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('./../../common/previewConfig');

class GameView extends React.Component {

  constructor(props){
    super(props);

    let initialLayout = new PIXI.Container();
    initialLayout.name = '初始';
    initialLayout.children = [{},{}];
    let initialLayout2 = new PIXI.Container();
    initialLayout2.name = '初始2';

    this.state = {
      currentLayoutIndex:0,
      layouts:[
        initialLayout,
        initialLayout2
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
    let { layouts } = this.state;

    return (
      <div id="gameView" ref="gameView"
        onDrop={this.addSprite.bind(this)}
        onDragOver={this.dragOver.bind(this)} >

        <div className="layouts-box">
          <CascadeList data={layouts} />
          <button onclick={this.addLayout.bind(this)}
            className="add-layout weui_btn weui_btn_mini weui_btn_primary" >
            +
          </button>
        </div>
      </div>
    )
  }
}

module.exports = GameView;