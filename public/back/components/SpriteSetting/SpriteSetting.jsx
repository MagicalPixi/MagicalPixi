require('./SpriteSetting.scss');

import React,{Component,PropTypes} from 'react'
import {settingListConfigMap} from './previewConfig'
import pixiLib from 'pixi-lib'

var { SPRITE_IM,SPRITE_MC,SPRITE_SP } = pixiLib.types

var propTypes = {
  spriteType: PropTypes.oneOf([SPRITE_IM, SPRITE_MC, SPRITE_SP, 'movieClip', 'image']),
  spriteProperties: PropTypes.object,
  onChangeSetting: PropTypes.func.isRequired,
  actionFrames: PropTypes.array,
};
var defaultProps = {
  spriteProperties: {},
  actionFrames: [],
};

class SpriteSetting extends React.Component {

  setting(refKey, settingKey) {
    let inputDom = this.refs[refKey];
    let value = inputDom.value;

    this.props.onChangeSetting({
      [settingKey]: value
    });
  }

  checkboxSetting(refKey, settingKey, checkBox) {
    let inputDom = this.refs[refKey];
    let checked = inputDom.checked;

    log(settingKey, checkBox[checked], checked);

    if (!settingKey) {
      //true 对应 play方法，调用play
      //false 对应 stop方法，调用stop
      settingKey = checkBox[checked];
    }


    this.props.onChangeSetting({
      [settingKey]: checked
    });
  }

  inputBuild(settingOne, i) {

    let {name,key,checkbox,describe,value} = settingOne;

    let refKey = 'setting' + i;

    let checked, inputType, onChange;

    if (checkbox) {
      inputType = 'checkbox';
      checked = value === undefined ? checkbox.default : !!value;
      onChange = this.checkboxSetting.bind(this, refKey, key, checkbox);
    } else {
      inputType = 'text';
      checked = false;
      onChange = this.setting.bind(this, refKey, key);
    }

    return (
      <input ref={refKey} checked={checked} value={value} onChange={onChange}
        type={inputType} placeholder={describe} />
    )
  }

  render() {
    var {spriteType,spriteProperties,actionFrames } = this.props;

    var settingListConfig = settingListConfigMap(spriteType, spriteProperties,actionFrames);

    return (
      <div className="properties-setting">
        {settingListConfig.map((settingOne, i)=> {
          var {name,key,checkbox,describe} = settingOne;

          var key = `${spriteProperties.spriteName}-keySetting${i}`

          return (
            <p className="setting-item-one" key={key}>
              <label htmlFor="name">{name}:</label>
              {this.inputBuild(settingOne, i)}
            </p>
          )
        })}
      </div>
    );
  }
}

SpriteSetting.propTypes = propTypes;
SpriteSetting.defaultProps = defaultProps;

module.exports = SpriteSetting;