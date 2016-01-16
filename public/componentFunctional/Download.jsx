let React = require('react');
let T = React.PropTypes;

let _ = require('lodash');

let API = require('../js/API');

class Download extends React.Component {

  downloadMaterial(materialName){

    window.open(API.downloadMaterial+'?name='+encodeURIComponent(materialName));
  }

  download(){
    let {materialName} = this.props;

    if(materialName){
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

Download.propTypes = {
  materialName:T.string.isRequired
}


module.exports = Download;