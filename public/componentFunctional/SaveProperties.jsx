let React = require('react');
let _ = require('lodash');

let ajax = require('../libs/ajax');

let apiUrl = '/api/saveProperties';

class SaveProperties extends React.Component {

  save(){
    let sendData = this.props.getParam();

    let {name:spriteName,spriteType} = sendData;

    delete sendData.name;
    delete sendData.spriteType;

    ajax(apiUrl).post({
      spriteType,
      spriteName,
      properties:sendData
    }).then((r)=>{
      console.log('r',r);
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