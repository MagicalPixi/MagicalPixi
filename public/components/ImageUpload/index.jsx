require('./index.scss');

let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('lodash');

class ImageUpload extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      multi:!!props.multi
    }
  }


  render(){
    return (
      <div id="ImageUpload">
        <h4>图片上传</h4>
      </div>
    )
  }
};

module.exports = ImageUpload;