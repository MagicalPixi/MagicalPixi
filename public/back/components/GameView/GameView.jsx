require('./GameView.scss');
require("../../../styles/wedget/button.css");

let PIXI = require('PIXI');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

import autoBind from 'react-autobind'

let pixiLib = require('pixi-lib');

let pixiContainersManager = require('../../../common/pixiContainersManager');

let CascadeList = require('./CascadeList');

let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('./../SpriteSetting/previewConfig');

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

  addLayout(){

    this.props.actions.containerAdd();
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

    let {currentLayoutIndex} = this.state;

    this.props.actions.addSpriteToScene(
      materialOne,
      currentLayoutIndex
    );
  }

  dragOver(e){
    e.preventDefault();
  }

  selectContainer(newLayoutIndex,selectedContainer){
   this.setState({
     currentLayoutIndex:newLayoutIndex
   })
  }

  render(){
    let { data } = this.props;

    return (
      <div id="gameView"
        onDrop={this.addSprite.bind(this)}
        onDragOver={this.dragOver.bind(this)} >

        <div className="layouts-box">
          <CascadeList
            data={data}
            onSelectContainer={this.selectContainer.bind(this)}
            onChangeContainerName={this.props.actions.containerRename}
            onChildRemove={this.props.actions.childRemove} />

          <button onClick={this.addLayout.bind(this)}
            className="add-layout weui_btn weui_btn_mini weui_btn_primary" >
            +
          </button>
        </div>

        <div ref="gameView">
        </div>

      </div>
    )
  }
}

module.exports = GameView;