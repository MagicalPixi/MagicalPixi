require('./settingList.scss');

import React,{Component,PropTypes} from 'react'
import {settingListConfigMap,SPRITE_IM,SPRITE_MC} from './previewConfig'

var propTypes = {
  spriteType:PropTypes.oneOf([SPRITE_IM,SPRITE_MC]),
  spriteProperties:PropTypes.object,
  changeSetting:PropTypes.func.isRequired
};
var defaultProps = {
};

class SettingList extends React.Component {

  setting(refKey,settingKey){
    let inputDom = this.refs[refKey];
    let value = inputDom.value;

    this.props.changeSetting({
      [settingKey]:value
    });
  }

  checkboxSetting(refKey,settingKey,checkBox){
    let inputDom = this.refs[refKey];
    let checked = inputDom.checked;

    log(settingKey,checkBox[checked],checked);

    if(!settingKey){
      //true 对应 play方法，调用play
      //false 对应 stop方法，调用stop
      settingKey = checkBox[checkBox];
    }


    this.props.changeSetting({
      [settingKey]:checked
    });
  }


  inputBuild(settingOne,i){

    let {name,key,checkbox,describe,value} = settingOne;

    let refKey = 'setting'+i;

    let checked, inputType,onChange;

    if(checkbox){
      inputType = 'checkbox';
      checked = value === undefined ? checkbox.default:!!value;
      onChange = this.checkboxSetting.bind(this,refKey,key,checkbox);
    }else{
      inputType = 'text';
      checked = false;
      onChange = this.setting.bind(this,refKey,key);
    }

    return (
      <input ref={refKey} checked={checked} defaultValue={value} onChange={onChange}
        type={inputType} placeholder={describe} />
    )
  }

  render(){
    let {spriteType,spriteProperties } = this.props;

    let settingListConfig = settingListConfigMap(spriteType,spriteProperties);

    return (
      <div className="properties-setting">
        {settingListConfig.map((settingOne,i)=>{
          let {name,key,checkbox,describe} = settingOne;

          return (
            <p className="setting-item-one" key={'keySetting'+i}>
              <label htmlFor="name">{name}:</label>
              {this.inputBuild(settingOne,i)}
            </p>
          )
        })}
      </div>
    );
  }
}

SettingList.propTypes = propTypes;
SettingList.defaultProps = defaultProps;

module.exports = SettingList;