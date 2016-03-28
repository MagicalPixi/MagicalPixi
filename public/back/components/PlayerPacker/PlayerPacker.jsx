require('./PlayerPacker.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import autoBind from 'react-autobind'

import pixiLib from 'pixi-lib'

import Popup from '../Popup'

import SpriteSetting from '../SpriteSetting'
import {settingListConfigMap,SPRITE_IM,SPRITE_MC} from '../SpriteSetting/previewConfig'

import SelectBasicResource from '../SelectBasicResource'

import EditText from '../../componentsBasic/EditText'

var propTypes = {
  player:T.object,
  //name:T.string,
  //childSprites:T.array,
  basics:T.array.isRequired
};

var defaultProps = {
  player:{
    name:'新建合成素材',
    childSprites:[{
      basic:{},
      properties:{}
    }],
  }
  //childSprites:[{
  //  basic: {
  //    _id: "56e575a6a48e57f094add877",
  //    name: "新建素材名",
  //    originImgUrls: [
  //      "/materials/admin/boom.png"
  //    ],
  //    resourceName: "/basic/_1458313928390_1",
  //    resourceUrl: "/basic/_1458313928390_1.png",
  //    type:"im"
  //  },
  //  properties: {}
  //}],
};

class PlayerPacker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player:Object.assign({},props.player),
      name:props.player.name,
      childSprites: props.player.childSprites.slice(),
      currentIndex: 0,
      onSetting:!!props.player.childSprites[0].basic.name,
    };

    autoBind(this);
  }

  componentDidMount() {
    var previewContainer = this.refs.previewContainer;

    this.stage = pixiLib.appendStage(previewContainer);

    this.selectAction(0)
  }

  //添加一组动作
  addAction(){
    var {childSprites,currentIndex} = this.state;

    var childSpritesElement = {
      basic:{},
      properties:{},
    };

    childSprites = childSprites.concat(childSpritesElement);

    currentIndex = childSprites.length - 1;

    this.stage.removeChildren();

    this.setState({
      childSprites,
      currentIndex,
      onSetting:false,
    });
  }
  //选择一个动作(tab)
  selectAction(e){
    var {childSprites} = this.state;

    var selectIndex = typeof e === 'number'? e : parseInt(e.target.getAttribute('data-i'));

    var {basic,properties} = childSprites[selectIndex];

    if(basic.resourceUrl) {
      pixiLib.loadSprite(basic.resourceUrl, basic.type, properties,
        (spriteObj)=> {
          pixiLib.setConfig(spriteObj, properties);

          this.spriteDisplayObj = spriteObj;

          this.stage.removeChildren();
          this.stage.addChild(spriteObj);

          this.setState({
            currentIndex: selectIndex,
            onSetting:true
          });
        }
      );
    }else{
      this.stage.removeChildren();

      this.setState({
        currentIndex: selectIndex,
        onSetting:false
      });
    }
  }

  selectBasic(basic){
    var {childSprites,currentIndex} = this.state;

    childSprites = childSprites.slice();

    var currentResource = childSprites[currentIndex];
    currentResource = Object.assign({},currentResource,{
      basic
    });

    childSprites[currentIndex] = currentResource;

    pixiLib.loadSprite(basic.resourceUrl,basic.type,currentResource.properties,
      (spriteObj)=>{
        this.spriteDisplayObj = spriteObj;

        this.stage.removeChildren();
        this.stage.addChild(spriteObj);
      }
    );

    this.setState({
      childSprites,
      onSetting:true
    });
  }
  spriteSetting(newProperties){
    log(newProperties);

    var {childSprites,currentIndex} = this.state;

    childSprites = childSprites.slice();

    var currentResource = childSprites[currentIndex];
    var oldProperties = currentResource.properties;

    newProperties = Object.assign({},oldProperties,newProperties);
    newProperties = pixiLib.fixSpriteProperties(oldProperties,newProperties);

    if(this.spriteDisplayObj){
      pixiLib.setConfig(this.spriteDisplayObj,newProperties);
    }

    currentResource = Object.assign({},currentResource,{
      properties:newProperties
    });

    childSprites[currentIndex] = currentResource;

    this.setState({
      childSprites
    });
  }
  reSelectBasic(){
    this.setState({
      onSetting:false
    });
  }
  save(){
    var {player,name,childSprites} = this.state;

    this.props.onPacker(Object.assign({},player,{
      name,
      childSprites
    }));
    this.props.close();
  }
  changeName(name){
    this.setState({
      name,
    });
  }
  render() {
    var { basics } = this.props;
    var {name,currentIndex,onSetting,childSprites} = this.state;

    var currentSettingObject = childSprites[currentIndex];

    var { resourceName } = currentSettingObject.basic;

    var { properties } = currentSettingObject;

    return (
      <div id="playerPacker">
        <h3>
          高级精灵
          <div className="title-box">
            <EditText
              onSubmit={this.changeName}
              value={name}
            />
          </div>
          <button onClick={this.save.bind(this)} className={`save weui_btn weui_btn_mini weui_btn_primary`} >保存</button>
        </h3>

        <header className="frames">
          <ol>
            {childSprites.map((ele,i)=>{
              var key = `tab${i+1}`;
              var className = i === currentIndex ? 'active':'';

              return (
                  <li key={key} onClick={this.selectAction} data-i={i} className={className}>{i+1}</li>
                )
            })}
            <li onClick={this.addAction}>+</li>
          </ol>
        </header>

        <div className="setting-box">
          <div id="previewContainer" ref="previewContainer" >
          </div>

          <div className="operation" data-setting={onSetting}>
            <div className="setting-box">
              <p className="select-resource-png">
                <span className="pre">所选资源:</span>
                <span onClick={this.reSelectBasic} className="basic-resource"
                  style={{backgroundImage:`url(${resourceName}.png)`}} >
                </span>
              </p>

              <div className="setting">
                <SpriteSetting
                  spriteType={SPRITE_MC}
                  spriteProperties={properties}
                  onChangeSetting={this.spriteSetting}
                />
              </div>

            </div>
            <div className="resource">
              <SelectBasicResource
                resources={basics}
                onSelect={this.selectBasic}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
PlayerPacker.propTypes = propTypes;

PlayerPacker.defaultProps = defaultProps;

module.exports = PlayerPacker;
