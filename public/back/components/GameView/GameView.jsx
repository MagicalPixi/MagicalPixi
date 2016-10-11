require('./GameView.scss');
require("../../../styles/wedget/button.css");

let PIXI = require('PIXI');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

import autoBind from 'react-autobind'

let pixiLib = require('pixi-lib');

import pixiContainersManager from '../../../common/pixiContainersManager'

import ToolsBar from  '../ToolsBar'


var toolsStyle = ()=>{
  return {
    position:'absolute',
    top:0,
    left:0,
  }
}

class GameView extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };

    autoBind(this);

  }

  componentDidMount(){
    let gameView = this.refs.gameView;

    this.stage = pixiLib.appendStage(gameView);

    this.refreshStage()
  }

  componentWillUnmount(){
    this.stage.clearRender();

  }

  componentDidUpdate(){
    this.refreshStage();
  }

  refreshStage(){

    let {data} = this.props;

    this.stage.removeChildren();

    log('data:',data);

    var manager = pixiContainersManager(data);
    let pixiContainers = manager.getPixiContainers();

    manager.onClick((spriteObj,containerIndex,spriteIndex)=>{
      this.props.actions.childEdit(spriteObj,containerIndex,spriteIndex);
    });

    pixiContainers.forEach((container) => {

      this.stage.addChild(container);
    })
  }

  removeLayout(){

  }

  addSprite(e){
    //来自sortable.js
    if(e.nativeEvent.dataTransfer.effectAllowed === 'move'){
      return;
    }

    let materialOne = JSON.parse(e.nativeEvent.dataTransfer.getData('text/plain'));

    //let properties = JSON.parse(materialOne.properties);

    let {currentLayoutIndex} = this.props;

    this.props.actions.addSpriteToScene(
      materialOne,
      currentLayoutIndex
    );
  }

  dragOver(e){
    e.preventDefault();
  }

  clickTools(target){

    var x = 0,
      y = 0,
      r = 0;
    if(!this.rotated){
      x = 320
      y = 502
      r = Math.PI/2
    }


    this.stage.pivot = new PIXI.Point(y, x)
    this.stage.x = x
    this.stage.y = y
    this.stage.rotation = r

    this.rotated = !this.rotated;
  }

  render(){
    
    var s = toolsStyle();
    
    return (
      <div id="gameView"
        onDrop={this.addSprite}
        onDragOver={this.dragOver} >


        <ToolsBar
          style={s}
          onClickItem={this.clickTools}>

        </ToolsBar>

        <div className="game" ref="gameView">
        </div>

      </div>
    )
  }
}

module.exports = GameView;