require('./TexturePacker.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

let FileUpload = require('../../componentsFunctional/FileUpload');

let Popup = require('../Popup');

class TexturePacker extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addNewImg(url){

  }

  render() {
    return (
      <section id="texturePacker">
        <header className="top">
          <h3>TexurePacker</h3>

          <div className="operations">
            <FileUpload onUploadCompleted={this.addNewImg.bind(this)}>
              <button className="weui_btn weui_btn_mini weui_btn_primary" >添加</button>
            </FileUpload>
            <button  className="weui_btn weui_btn_mini weui_btn_primary" >保存</button>
          </div>
        </header>


        <div className="images-box">
          <ul className="images">

            <li></li>
            <li></li>
          </ul>
        </div>

      </section>
    )
  }
}

TexturePacker.propTypes = {

};

var TexturePackerFn = React.createFactory(TexturePacker);

module.exports = function (props) {

  return Popup(TexturePackerFn(props),{
    width:650
  })
};
