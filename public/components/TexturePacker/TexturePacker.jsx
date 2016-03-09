require('./TexturePacker.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import FileUpload from '../../componentsFunctional/FileUpload'
import Popup from '../Popup'
import Sortable from '../../componentsFunctional/Sortable'

import wrapperImages from '../../common/wrapperImages'
import getBase64FromImages from '../../common/getBase64FromImages'
import getPixiJsonFromImages from '../../common/getPixiJsonFromImages'

import EditText from '../../componentsBasic/EditText'


class TexturePacker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:'新建素材名',
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
  save(){
    var { name,imgUrls } = this.state;

    if(imgUrls.length < 1){
      return;
    }

    Promise.all(imgUrls.map(url=> {
      var imgObj = new Image();
      imgObj.src = url;
      return imgObj;
    }).map(imgObj=>{
      return new Promise(resolve=>{
        imgObj.onload = ()=>{
         resolve(imgObj);
        }
      })
    })).then(imgObjs=>{

      var wrapperedImages = wrapperImages(imgObjs);

      var base64 = getBase64FromImages(wrapperedImages);
      var pixiJson = getPixiJsonFromImages(wrapperedImages);

      this.props.onCompleted({
        name,
        base64,
        pixiJson
      });
    });
  }

  submitBasicTitle(name){
    this.setState({
      name
    })
  }

  render() {
    var {name,imgUrls} = this.state;

    var saveDisabled = imgUrls.length < 1 ? 'weui_btn_disabled':'';

    return (
      <div id="texturePacker">
        <header className="top">
          <h3>
            <EditText
              style={{
                width:'7em',
                minHeight:0,
              }}
              onSubmit={this.submitBasicTitle.bind(this)}
              value={name}
              />
          </h3>

          <div className="operations">
            <FileUpload onUploadCompleted={this.addNewImg.bind(this)} >
              <button className="weui_btn weui_btn_mini weui_btn_primary" >添加</button>
            </FileUpload>
            <button onClick={this.save.bind(this)} className={`weui_btn weui_btn_mini weui_btn_primary ${saveDisabled}`} >保存</button>
          </div>
        </header>


        <div ref="imagesBox" className="images-box">

          <Sortable className="images">
            {imgUrls.map((imgUrl,i)=>{

              var key = `img${i}`;

              return (
                <li key={key}>
                  <div className="close" onClick={this.remove.bind(this,i)}></div>
                  <img src={imgUrl} />
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

  onCompleted:T.func.isRequired
};

var TexturePackerFn = React.createFactory(TexturePacker);

module.exports = function (props) {

  return Popup(TexturePackerFn(props),{
    width:650,
    top:200
  })
};
