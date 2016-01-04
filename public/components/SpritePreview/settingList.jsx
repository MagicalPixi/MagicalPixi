require('./settingList.scss');

let PIXI = require('pixi');
let React = require('react');


class SettingList extends React.Component {


  setting(refKey,settingKey){
    let inputDom = this.refs[refKey];
    let value = inputDom.value;

    console.log(refKey,inputDom.value);

    this.props.changeSetting({
      [settingKey]:value
    });
  }

  render(){
    let settingList = this.props.settingListConfig.map((settingOne,i)=>{
      let {name,key,describe} = settingOne;

      return (
        <p className="setting-item-one" key={'keySetting'+i}>
          <label htmlFor="name">{name}:</label>
          <input ref={'setting'+i} onChange={this.setting.bind(this,'setting'+i,key)} id="name" idtype="text" placeholder={describe} />
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