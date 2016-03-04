require('./TexturePacker.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import FileUpload from '../../componentsFunctional/FileUpload'
import Popup from '../Popup'
import Sortable from '../../componentsFunctional/Sortable'

class TexturePacker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrls:[]
    };
  }

  addNewImg(url){
    var {imgUrls} = this.state;

    imgUrls = imgUrls.concat(url);

    this.setState({
      imgUrls
    });

  }

  remove(index){
   var {imgUrls} = this.state;

    imgUrls.splice(index,1);

    this.setState({
      imgUrls
    })
  }

  render() {
    var {imgUrls} = this.state;

    return (
      <div id="texturePacker">
        <header className="top">
          <h3>TexurePacker</h3>

          <div className="operations">
            <FileUpload onUploadCompleted={this.addNewImg.bind(this)} >
              <button className="weui_btn weui_btn_mini weui_btn_primary" >添加</button>
            </FileUpload>
            <button  className="weui_btn weui_btn_mini weui_btn_primary" >保存</button>
          </div>
        </header>


        <div className="images-box">

          <Sortable className="images">
            {imgUrls.map((imgUrl,i)=>{

              var key = `img${i}`;

              return (
                <li key={key}>
                  <div className="close" onClick={this.remove.bind(this,i)}></div>
                  <img width="100%" src={imgUrl} />
                </li>
              )
            })}
          </Sortable>
        </div>

      </div>
    )
  }
}

TexturePacker.propTypes = {

};

var TexturePackerFn = React.createFactory(TexturePacker);

module.exports = function (props) {

  return Popup(TexturePackerFn(props),{
    width:650,
    top:200
  })
};
