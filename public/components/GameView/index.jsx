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

    this.state = {
      currentLayoutIndex:0,
    };

    log('GameView:',props);
  }

  componentDidMount(){
    let gameView = this.refs.gameView;

    this.stage = appendPixiContainer(gameView);

    this.refreshStage()
  }

  componentWillUnmount(){
    this.stage.clearRender();

  }

  componentWillUpdate(){
    this.refreshStage();
  }

  refreshStage(){

    let {data} = this.props;

    this.stage.removeChild();

    data.forEach(container=>{
      this.stage.addChild(container);
    })
  }

  addLayout(){

    this.props.actions.addContainer();
  }

  removeLayout(){

  }

  addSprite(e){
    let materialOne = JSON.parse(e.nativeEvent.dataTransfer.getData('text/plain'));

    let properties = JSON.parse(materialOne.properties);

    let {currentLayoutIndex} = this.state;
    let {data} = this.props;

    loadResource(materialOne.resourceUrl,(resource)=>{

      properties.textures = resource.texture || resource.textures;

      let spriteDisplayObj = spriteFnMap(materialOne.type)(properties);

      this.props.actions.addSpriteToScene(
        spriteDisplayObj,
        currentLayoutIndex
      );

      this.forceUpdate();
    });
  }

  dragOver(e){
    e.preventDefault();
  }

  render(){
    let { data } = this.props;

    return (
      <div id="gameView" ref="gameView"
        onDrop={this.addSprite.bind(this)}
        onDragOver={this.dragOver.bind(this)} >

        <div className="layouts-box">
          <CascadeList data={data}  />
          <button onClick={this.addLayout.bind(this)}
            className="add-layout weui_btn weui_btn_mini weui_btn_primary" >
            +
          </button>
        </div>
      </div>
    )
  }
}

module.exports = GameView;