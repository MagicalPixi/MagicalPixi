let React = require('react');
let _ = require('lodash');

let ajax = require('../libs/ajax');

let apiUrl = '/api/saveProperties';

class SaveProperties extends React.Component {

  save(){
    let sendData = this.props.getParam();

    let {id,spriteName,spriteType,resourceUrl,properties} = sendData;

    properties = Object.assign({},properties);

    ajax(apiUrl).post({
      id,
      resourceUrl,
      spriteType,
      spriteName,
      properties
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