require('./SpritePreview.scss');
require("../../../styles/wedget/button.css");

let PIXI = require('pixi');
let pixiLib = require('pixi-lib');
let React = require('react');

import autoBind from 'react-autobind'

var T = React.PropTypes;

let SaveProperties = require('../../componentsFunctional/SaveProperties');

let SpriteSetting = require('../SpriteSetting');
let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('../SpriteSetting/previewConfig');

let SelectBasicResource = require('../SelectBasicResource');

let getSpriteTpeByUrl  = (url)=>{

  let im = /\.png$/;
  let mc =  /\.json/;

  return mc.test(url)?SPRITE_MC:
    im.test(url)?SPRITE_IM:null;
};

var propTypes = {
  resources:T.array,
  resources2:T.array,
  sprite:T.object,
  id:T.string,
  _id:T.string,
  resourcesUrl:T.string,
  type:T.string,
  actionFrames:T.oneOfType([T.array,T.string]),
  properties:T.oneOfType([T.object,T.string]),
  onSubmit:T.func.isRequired,
  closePreview:T.bool
};


var defaultProps = {
  resourceUrl:'',
  properties:{},
  closePreview:false,
};

class SpritePreview extends React.Component {

  constructor(props){
    super(props);
    autoBind(this);

    let {id,_id,resourceUrl,type,properties,sprite,actionFrames,closePreview} = props;

    if(typeof properties === 'string'){
      properties = JSON.parse(properties);
    }

    if(typeof actionFrames === 'string'){
      actionFrames = JSON.parse(actionFrames);
    }

    this.state = {
      init:!resourceUrl,
      spriteType:type,
      spriteDisplayObjProperties:Object.assign({
      },properties),
      originSprite:sprite,
      actionFrames,
      closePreview:!!closePreview
    };

    this.spriteDisplayObj = {};

    this.resourceUrl = resourceUrl;

    this.id = id || _id;

    this.setPropertyTo = this.setPropertyTo.bind(this);
    this.selectBasicResource = this.selectBasicResource.bind(this);
    this.buildPostParam = this.buildPostParam.bind(this);
    this.onSavePropertiesCompleted = this.onSavePropertiesCompleted.bind(this);
  }

  componentDidMount(){
    let previewContainer = this.refs.previewContainer;

    this.stage = pixiLib.appendStage(previewContainer);

    if(this.resourceUrl){
      this.loadSprite(this.state.spriteType);
    }
  }

  componentWillUnmount(){
    this.stage.clearRender();
  }

  loadSprite(spriteType){
    let { spriteDisplayObjProperties ,actionFrames} = this.state;
    let resourceUrl = this.resourceUrl;

    spriteDisplayObjProperties = Object.assign({},spriteDisplayObjProperties);

    pixiLib.loadSprite(resourceUrl, spriteType, spriteDisplayObjProperties,actionFrames,
      (spriteDisplayObj) => {
        this.spriteDisplayObj = spriteDisplayObj;
        this.stage.removeChildren();
        this.stage.addChild(this.spriteDisplayObj);
      });

    //loadResource(resourceUrl,  (resource) => {
    //  //同时兼容到im和mc
    //  spriteDisplayObjProperties.textures = resource.texture || resource.textures;
    //
    //  this.spriteDisplayObj = spriteFnMap(spriteType)(spriteDisplayObjProperties);
    //
    //  this.stage.removeChildren();
    //  this.stage.addChild(this.spriteDisplayObj);
    //
    //  this.setState({
    //    spriteType,
    //    init:false
    //  });
    //});
  }

  setPropertyTo(properties={}){

    let { spriteDisplayObjProperties:oldProperties} = this.state;

    let newProperties = Object.assign({},oldProperties,properties);

    newProperties = pixiLib.fixSpriteProperties(properties,newProperties);

    if(this.spriteDisplayObj){
      pixiLib.setConfig(this.spriteDisplayObj,newProperties);
    }

    this.setState({
      spriteDisplayObjProperties:newProperties
    });
  }

  buildPostParam(){

    let {spriteType,spriteDisplayObjProperties,basicResourceObj,originSprite } = this.state;

    let resourceUrl = this.resourceUrl;

    let postParam = false;

    postParam = Object.assign({},basicResourceObj,originSprite,{
      id: this.id,
      resourceUrl,
      spriteType,
      spriteName: spriteDisplayObjProperties.spriteName,
      properties: spriteDisplayObjProperties
    });

    return postParam;
  }

  onSavePropertiesCompleted(r){
    if(r){
      location.reload();
      //this.props.close();
    }
  }

  selectBasicResource(basicResourceObj){
    if(basicResourceObj){
      var {resourceUrl,type} = basicResourceObj;
      //
      this.resourceUrl = resourceUrl;

      this.loadSprite(type);

      this.setState({
        spriteType:type,
        init:false,
        basicResourceObj,
      })
    }
  }

  submit(){
    this.props.onSubmit(
      this.buildPostParam()
    );
  }

  render(){
    var {init,spriteType,spriteDisplayObjProperties,actionFrames,closePreview} = this.state;

    var {resources,resources2} = this.props;

    return (
      <div id="mpSpritePreviewBox" data-init={init} data-close-preview={closePreview} >
        <h3>精灵</h3>

        <div className="container">
          <div className="preview-container-box" >

            <div className="select-resource" data-resource-tab="basic" >
              <SelectBasicResource
                resources={resources}
                onSelect={this.selectBasicResource}
                />
              <hr className="line" />
              <SelectBasicResource
                resources={resources2}
                onSelect={this.selectBasicResource}
                />

          </div>

            <div ref="previewContainer" className="preview-container">
            </div>

          </div>

          <div className="sprite-setting-box">
            <SpriteSetting
              spriteType={spriteType}
              actionFrames={actionFrames}
              spriteProperties={spriteDisplayObjProperties}
              onChangeSetting={this.setPropertyTo}
            />
          </div>

        </div>

        <footer className="operation">
          <button onClick={this.submit} className="weui_btn weui_btn_mini weui_btn_primary" >确定</button>
          <button onClick={this.props.close} className="weui_btn weui_btn_mini weui_btn_default">取消</button>
        </footer>
      </div>
    )
  }
}

SpritePreview.defaultProps = defaultProps;
SpritePreview.propTypes = propTypes;

module.exports = SpritePreview;