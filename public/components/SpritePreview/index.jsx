require('./index.scss');
require("../../styles/wedget/button.css");

let PIXI = require('pixi');
let React = require('react');

let utils = require('../../common/utils');

let Popup = require('../Popup');

let FileUpload = require('../../componentFunctional/FileUpload');
let SettingList = require('./SettingList');
let SaveProperties = require('../../componentFunctional/SaveProperties');

let setConfig = require('../../common/setConfig');
let renderer = require('../../common/getRenderer');

let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('./previewConfig');


let getSpriteTpeByUrl  = (url)=>{

  let im = /\.png$/;
  let mc =  /\.json/;

  return mc.test(url)?SPRITE_MC:
    im.test(url)?SPRITE_IM:null;
};


class SpritePreview extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      init:true,
      spriteType:'',
      spriteDisplayObjProperties:{
        name:props.name
      }
    };


    this.spriteDisplayObj = {};

    this.resourceUrl = '';
  }

  componentDidMount(){
    let previewContainer = this.refs.previewContainer;

    previewContainer.appendChild(renderer.view);

    this.stage = new PIXI.Container();

    this.runRender(this.stage);
  }

  componentWillUnmount(){
    cancelAnimationFrame(this.rafFlag);
  }

  runRender(stage){

    let animate = () => {

      stage.children.forEach((function(child){
        if(child.render){
          child.render();
        }
      }));
      // render the stage container
      renderer.render(stage);

      this.rafFlag = requestAnimationFrame(animate);
    };
    animate();
  };


  onUploadCompleted(uploadResult){
    let { spriteDisplayObjProperties} = this.state;

    let resourceKey = 'img' + Date.now();

    let spriteType = getSpriteTpeByUrl(uploadResult);

    this.resourceUrl = uploadResult;

    PIXI.loader.add(resourceKey,uploadResult)
      .load((loader,resources)=>{

        //同时兼容到im和mc
        spriteDisplayObjProperties.textures = resources[resourceKey].texture || resources[resourceKey].textures;

        this.spriteDisplayObj = spriteFnMap(spriteType)(spriteDisplayObjProperties);

        this.stage.removeChildren();
        this.stage.addChild(this.spriteDisplayObj);

        this.setState({
          spriteType,
          init:false
        })
      });
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
    let { spriteDisplayObjProperties:oldProperties} = this.state;

    let newProperties = Object.assign(oldProperties,properties);

    newProperties = this.fixProperties(properties,newProperties);

    if(this.spriteDisplayObj){
      setConfig(this.spriteDisplayObj,newProperties);
    }

    this.setState({
      spriteDisplayObjProperties:newProperties
    });
  }

  buildPostParam(){

    let {spriteType,spriteDisplayObjProperties } = this.state;

    let resourceUrl = this.resourceUrl;

    return Object.assign({
      resourceUrl,
      spriteType,
      spriteName:spriteDisplayObjProperties.name
    },spriteDisplayObjProperties)
  }

  onSavePropertiesCompleted(r){

  }



  render(){
    let {init,spriteType} = this.state;

    return (
      <div id="mpSpritePreviewBox" data-init={init}>
        <h3>精灵</h3>

        <div className="container">
          <FileUpload onUploadCompleted={this.onUploadCompleted.bind(this)}>
            <div ref="previewContainer" className="preview-container">

            </div>
          </FileUpload>

          <SettingList spriteType={spriteType}
                       changeSetting={this.setPropertyTo.bind(this)} />

        </div>

        <footer className="operation">
          <SaveProperties getParam={this.buildPostParam.bind(this)} onSavePropertiesCompleted={this.onSavePropertiesCompleted.bind(this)} >
            <button className="weui_btn weui_btn_mini weui_btn_primary">确定（没效果）</button>
          </SaveProperties>
          <button className="weui_btn weui_btn_mini weui_btn_default">取消（没效果）</button>
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