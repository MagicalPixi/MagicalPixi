require('./PlayerPacker.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import pixiLib from 'pixi-lib'

import Popup from '../Popup'

import SpriteSetting from '../SpriteSetting'
import {settingListConfigMap,SPRITE_IM,SPRITE_MC} from '../SpriteSetting/previewConfig'

import SelectBasicResource from '../SelectBasicResource'

var propTypes = {
  childSprites:T.array
};

var defaultProps = {
  childSprites:[{
    sprite: {
      _id: "56e575a6a48e57f094add877",
      name: "新建素材名",
      originImgUrls: [
        "/materials/admin/boom.png"
      ],
      resourceName: "/basic/_1458313928390_1",
      resourceUrl: "/basic/_1458313928390_1.png",
      type:"im"
    },
    properties: {}
  }],
  basics:[]
};

class PlayerPacker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childSprites: props.childSprites,
      currentIndex: 0,
      onSetting:true,
    };

    this.selectBasic = this.selectBasic.bind(this);
    this.spriteSetting = this.spriteSetting.bind(this);
    this.reSelectBasic = this.reSelectBasic.bind(this);
  }

  componentDidMount() {
    var previewContainer = this.refs.previewContainer;

    this.stage = pixiLib.appendStage(previewContainer);
  }

  selectBasic(basicObj){
    var {childSprites,currentIndex} = this.state;

    log(basicObj);

    childSprites = childSprites.slice();

    var currentResource = childSprites[currentIndex];
    currentResource.sprite = basicObj;

    pixiLib.loadResource(basicObj.resourceUrl,basicObj.type,currentResource.properties,
      (spriteObj)=>{
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
    log(newProperties)
  }
  reSelectBasic(){
    this.setState({
      onSetting:false
    })
  }
  render() {
    var { basics } = this.props;
    var {currentIndex,onSetting,childSprites} = this.state;

    var currentSettingObject = childSprites[currentIndex];

    var { resourceName } = currentSettingObject.sprite;

    return (
      <div id="playerPacker">
        <h3>高级精灵</h3>

        <header className="frames">
          <ol>
            <li className="active">1</li>
            <li>2</li>
          </ol>
        </header>

        <div className="setting-box">
          <div id="previewContainer" ref="previewContainer" >
          </div>

          <div className="operation" data-setting={onSetting}>
            <div className="setting-box">
              <p className="select-resource-png">
                <span className="pre">所选资源:</span>
                <div onClick={this.reSelectBasic} className="basic-resource"
                  style={{backgroundImage:`url(${resourceName}.png)`}} >
                </div>
              </p>

              <div className="setting">
                <SpriteSetting
                  spriteType={SPRITE_MC}
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
