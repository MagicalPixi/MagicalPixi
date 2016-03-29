require('./SpritePreview.scss');
require("../../../styles/wedget/button.css");

let PIXI = require('pixi');
let pixiLib = require('pixi-lib');
let React = require('react');

var T = React.PropTypes;
let Popup = require('../Popup');

let FileUpload = require('../../componentsFunctional/FileUpload');
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
  id:T.string,
  resourcesUrl:T.string,
  type:T.string,
  properties:T.oneOfType([T.object,T.string]),
};


var defaultProps = {
  resourceUrl:'',
  properties:{},
};

class SpritePreview extends React.Component {

  constructor(props){
    super(props);

    let {id,resourceUrl,type,properties} = props;

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

    this.setPropertyTo = this.setPropertyTo.bind(this);
    this.selectBasicResource = this.selectBasicResource.bind(this);
    this.buildPostParam = this.buildPostParam.bind(this);
    this.onSavePropertiesCompleted = this.onSavePropertiesCompleted.bind(this);
  }

  componentDidMount(){
    let previewContainer = this.refs.previewContainer;

    this.stage = pixiLib.appendStage(previewContainer);

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

    pixiLib.loadSprite(resourceUrl, spriteType, spriteDisplayObjProperties,
      (spriteDisplayObj) => {
        this.spriteDisplayObj = spriteDisplayObj;
        this.stage.removeChildren();
        this.stage.addChild(this.spriteDisplayObj);

        this.setState({
          spriteType,
          init: false
        })
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

  onUploadCompleted(uploadResult){
    this.resourceUrl = uploadResult;
    this.loadSprite();
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

  selectBasicResource(basicResourceObj){
    if(basicResourceObj){
      this.onUploadCompleted(basicResourceObj.resourceUrl)
    }
  }

  render(){
    var {init,spriteType,spriteDisplayObjProperties} = this.state;

    var {resources,resources2} = this.props;

    return (
      <div id="mpSpritePreviewBox" data-init={init}>
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
              spriteProperties={spriteDisplayObjProperties}
              onChangeSetting={this.setPropertyTo}
            />
          </div>

        </div>

        <footer className="operation">
          <SaveProperties getParam={this.buildPostParam} onSavePropertiesCompleted={this.onSavePropertiesCompleted} >
            <button className="weui_btn weui_btn_mini weui_btn_primary">确定</button>
          </SaveProperties>
          <button onClick={this.props.close} className="weui_btn weui_btn_mini weui_btn_default">取消</button>
        </footer>
      </div>
    )
  }
}

SpritePreview.defaultProps = defaultProps;
SpritePreview.propTypes = propTypes;

var SpritePreviewFn = React.createFactory(SpritePreview);

module.exports = (props) => {

  return Popup(SpritePreviewFn(props));
};