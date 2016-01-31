let React = require('react');
let T = React.PropTypes;

let _ = require('lodash');

let buildQueryStr = require('../public/common/buildQueryStr');

let API = require('../js/API');

class Download extends React.Component {

  downloadMaterial(query){

    let queryStr = buildQueryStr(query);

    window.open(API.downloadMaterial+`?${queryStr}`);
  }

  download(){
    let {query} = this.props;

    if(query){
      this.downloadMaterial(query)
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
  query:T.object.isRequired
}


module.exports = Download;