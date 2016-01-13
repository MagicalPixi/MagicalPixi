let React = require('react');
let _ = require('lodash');

let ajax = require('../libs/ajax');

let apiUrl = '/api/saveProperties';

class SaveProperties extends React.Component {

  save(){
    let sendData = this.props.getParam();

    let {name:spriteName,spriteType,resourceUrl} = sendData;

    delete sendData.resourceUrl;
    delete sendData.name;
    delete sendData.spriteType;

    ajax(apiUrl).post({
      resourceUrl,
      spriteType,
      spriteName,
      properties:sendData
    }).then((r)=>{

      this.props.onSavePropertiesCompleted({
        result:r.ok
      });
    });
  }

  render(){
    return (
      <a href="javascript:void 0" onClick={this.save.bind(this)}>
      {this.props.children}
      </a>
    )
  }
}


module.exports = SaveProperties;