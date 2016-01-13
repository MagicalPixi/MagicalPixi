let React = require('react');
let _ = require('lodash');

let ajax = require('../libs/ajax');

class Download extends React.Component {

  downloadMaterial(materialName){

    //let url = '/api/downloadMaterial';
    //
    //ajax(url).get({
    //  name:materialName
    //}).then(function (d) {
    //  console.log(d);
    //})

    window.open('/download/materials');
  }

  download(){
    let {materialName} = this.props;

    if(this.props.materialName){
      this.downloadMaterial(materialName)
    }

  }

  render(){
    return (
      <a href="javascript:void 0" onClick={this.download.bind(this)}>
      {this.props.children}
      </a>
    )
  }
}


module.exports = Download;