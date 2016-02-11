require('./SpritePreview.scss');
require("../../styles/wedget/button.css");

let PIXI = require('pixi');
let pixiLib = require('pixi-lib');
let React = require('react');

let utils = require('../../common/utils');

let Popup = require('../Popup');

let FileUpload = require('../../componentFunctional/FileUpload');
let SettingList = require('./SettingList');
let SaveProperties = require('../../componentFunctional/SaveProperties');

let appendPixiContainer = require('../../common/appendPixiContainer');
let loadResource = require('../../common/loadResource');

let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('./../../common/previewConfig');


let getSpriteTpeByUrl  = (url)=>{

  let im = /\.png$/;
  let mc =  /\.json/;

  return mc.test(url)?SPRITE_MC:
    im.test(url)?SPRITE_IM:null;
};


class SpritePreview extends React.Component {

  constructor(props){
    super(props);

    let {id,resourceUrl='',type,properties={}} = props;

    if(typeof properties === 'string'){
      properties = JSON.parse(properties);
    }

    this.state = {
      init:!resourceUrl,
      spriteType:type,
      spriteDisplayObjProperties:Object.assign({
      },properties)
    };

    this.spriteDisplayObj = {};

    this.resourceUrl = resourceUrl;

    this.id = id;
  }

  componentDidMount(){
    let previewContainer = this.refs.previewContainer;

    this.stage = appendPixiContainer(previewContainer);

    if(this.resourceUrl){
      this.loadSprite();
    }
  }

  componentWillUnmount(){
    this.stage.clearRender();
  }

  loadSprite(){
    let { spriteDisplayObjProperties} = this.state;
    let resourceUrl = this.resourceUrl;

    let spriteType = getSpriteTpeByUrl(resourceUrl);

    loadResource(resourceUrl,  (resource) => {
      //同时兼容到im和mc
      spriteDisplayObjProperties.textures = resource.texture || resource.textures;

      this.spriteDisplayObj = spriteFnMap(spriteType)(spriteDisplayObjProperties);

      this.stage.removeChildren();
      this.stage.addChild(this.spriteDisplayObj);

      this.setState({
        spriteType,
        init:false
      })
    });
  }

  onUploadCompleted(uploadResult){
    this.resourceUrl = uploadResult;
    this.loadSprite();
  }

  fixProperties(properties,newProperties){

    if(properties.play !== undefined){
      delete newProperties.stop;
    }
    if(properties.stop !== undefined){
      delete newProperties.play;
    }

    return newProperties;
  }

  setPropertyTo(properties={}){

    log('properties:',properties);

    let { spriteDisplayObjProperties:oldProperties} = this.state;

    let newProperties = Object.assign(oldProperties,properties);

    newProperties = this.fixProperties(properties,newProperties);

    if(this.spriteDisplayObj){
      pixiLib.setConfig(this.spriteDisplayObj,newProperties);
    }

    this.setState({
      spriteDisplayObjProperties:newProperties
    });
  }

  buildPostParam(){

    let {spriteType,spriteDisplayObjProperties } = this.state;

    let resourceUrl = this.resourceUrl;

    let postParam = false;

    postParam = Object.assign({
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

  render(){
    let {init,spriteType,spriteDisplayObjProperties} = this.state;

    return (
      <div id="mpSpritePreviewBox" data-init={init}>
        <h3>精灵</h3>

        <div className="container">
          <FileUpload onUploadCompleted={this.onUploadCompleted.bind(this)}>
            <div ref="previewContainer" className="preview-container">

            </div>
          </FileUpload>

          <SettingList spriteType={spriteType} spriteProperties={spriteDisplayObjProperties}
                       changeSetting={this.setPropertyTo.bind(this)} />

        </div>

        <footer className="operation">
          <SaveProperties getParam={this.buildPostParam.bind(this)} onSavePropertiesCompleted={this.onSavePropertiesCompleted.bind(this)} >
            <button className="weui_btn weui_btn_mini weui_btn_primary">确定</button>
          </SaveProperties>
          <button onClick={this.props.close} className="weui_btn weui_btn_mini weui_btn_default">取消</button>
        </footer>
      </div>
    )
  }
}

let SpritePreviewFn = React.createFactory(SpritePreview);

module.exports = (props) => {

  return Popup(SpritePreviewFn(props),{
    width:'650px'
  });
};