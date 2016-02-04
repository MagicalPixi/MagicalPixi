require('./settingList.scss');

let PIXI = require('pixi');
let React = require('react');

let {settingListConfigMap} = require('./previewConfig');

class SettingList extends React.Component {


  setting(refKey,settingKey){
    let inputDom = this.refs[refKey];
    let value = inputDom.value;

    this.props.changeSetting({
      [settingKey]:value
    });
  }

  checkboxSetting(refKey,checkBox){
    let inputDom = this.refs[refKey];
    let checked = inputDom.checked;

    console.log(checkBox,checkBox[checked],checked);

    this.props.changeSetting({
      [checkBox[checked]]:checked
    });
  }


  inputBuild(settingOne,i){
    let checked = false;

    let {name,key,checkbox,describe,value} = settingOne;

    let refKey = 'setting'+i;

    let inputType = 'text';
    let onChange = this.setting.bind(this,refKey,key);

    if(checkbox){
      checked = checkbox.default;
      inputType = 'checkbox';
      onChange = this.checkboxSetting.bind(this,refKey,checkbox);
    }

    return (
      <input ref={refKey} checked={checked} defaultValue={value} onChange={onChange}
        type={inputType} placeholder={describe} />
    )
  }

  render(){
    let {spriteType,spriteProperties } = this.props;

    let settingListConfig = settingListConfigMap(spriteType,spriteProperties);

    let settingList = settingListConfig.map((settingOne,i)=>{
      let {name,key,checkbox,describe} = settingOne;

      return (
        <p className="setting-item-one" key={'keySetting'+i}>
          <label htmlFor="name">{name}:</label>
          {this.inputBuild(settingOne,i)}
        </p>
      )
    });

    return (
      <div className="properties-setting">
        {settingList}
      </div>
    );
  }
}

module.exports = SettingList;