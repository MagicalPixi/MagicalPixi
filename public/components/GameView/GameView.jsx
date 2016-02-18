require('./GameView.scss');
require("../../styles/wedget/button.css");

let PIXI = require('PIXI');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

let appendPixiContainer = require('../../common/appendPixiContainer');
let loadResource = require('../../common/loadResource');
let pixiContainersManager = require('../../common/pixiContainersManager');

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

  componentDidUpdate(){
    this.refreshStage();
  }

  refreshStage(){

    let {data} = this.props;

    this.stage.removeChildren();

    log('data:',data);

    let pixiContainers = pixiContainersManager(data).getPixiContainers();

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

    //loadResource(materialOne.resourceUrl,(resource)=>{
    //
    //  properties.textures = resource.texture || resource.textures;
    //
    //  //let spriteDisplayObj = spriteFnMap(materialOne.type)(properties);
    //
    //  this.props.actions.addSpriteToScene(
    //    materialOne,
    //    currentLayoutIndex
    //  );
    //
    //  //this.forceUpdate();
    //  this.refreshStage();
    //});

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
      <div id="gameView" ref="gameView"
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
      </div>
    )
  }
}

module.exports = GameView;