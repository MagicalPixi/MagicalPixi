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
      [checkBox[checked]]:null
    });
  }


  inputBuild(settingOne,i){
    let {name,key,checkbox,describe} = settingOne;

    let refKey = 'setting'+i;

    let inputType = 'text';
    let onChange = this.setting.bind(this,refKey,key);

    if(checkbox){
      inputType = 'checkbox';
      onChange = this.checkboxSetting.bind(this,refKey,checkbox);
    }

    return (
      <input ref={refKey} onChange={onChange} id="name" type={inputType} placeholder={describe} />
    )
  }

  render(){
    let settingListConfig = settingListConfigMap(this.props.spriteType);

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