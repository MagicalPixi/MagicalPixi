require('./TexturePacker.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import FileUpload from '../../componentsFunctional/FileUpload'
import Popup from '../Popup'
import Sortable from '../../componentsFunctional/Sortable'

import wrapperImages from '../../../common/wrapperImages'
import getBase64FromImages from '../../../common/getBase64FromImages'
import getPixiJsonFromImages from '../../../common/getPixiJsonFromImages'

import EditText from '../../componentsBasic/EditText'

import autobind from 'react-autobind'

var propTypes = {
  onCompleted:T.func.isRequired,
  imgUrls:T.array,
  name:T.string,
};
var defaultProps = {
  name:'新建素材名',
  imgUrls:[],
};

class TexturePacker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:props.name,
      imgUrls:props.imgUrls,
      imgUrlObjs:props.imgUrls.map(url=>{
        return {
          url,
          resize:1,
        }
      })
    };

    autobind(this)
  }

  componentDidUpdate(){

    var {imgUrlObjs} = this.state;

    imgUrlObjs.forEach(({url},i)=>{

      var rKey = `img${i}`
      var canvas = this.refs[rKey]
      var context = canvas.getContext('2d')
      var img = new Image()
      img.src = url
      img.onload = ()=>{
        canvas.width = img.width
        canvas.height = img.height
        context.drawImage(img,0,0)
      }
    })
  }

  addNewImg(url){
    var {imgUrlObjs} = this.state;

    console.log(url)

    imgUrlObjs = imgUrlObjs.concat({
      url,
      resize:1,
    })

    this.setState({
      imgUrlObjs,
    });

  }

  remove(index){
   var {imgUrlObjs} = this.state;

    imgUrlObjs = imgUrlObjs.splice(index,1).slice();

    this.setState({
      imgUrlObjs
    })
  }
  save(){
    var { name,imgUrlObjs } = this.state;

    // if(imgUrlObjs.length < 1){
    //   return;
    // }
    //
    // Promise.all(imgUrlObjs.map(urlObj=> {
    //   var imgObj = new Image();
    //   imgObj.src = url;
    //   return imgObj;
    // }).map(imgObj=>{
    //   return new Promise(resolve=>{
    //     imgObj.onload = ()=>{
    //      resolve(imgObj);
    //     }
    //   });
    // })).then(imgObjs=>{
    //
    //   var type = ''; //mc精灵,im图片
    //
    //   var afterWrapperImages = wrapperImages(imgObjs);
    //
    //   var base64 = getBase64FromImages(afterWrapperImages);
    //
    //   var pixiJson = getPixiJsonFromImages(afterWrapperImages);
    //
    //   if(imgObjs.length > 1){
    //     type = 'mc';
    //   }else{
    //     type = 'im';
    //   }
    //
    //   this.props.onCompleted({
    //     type,
    //     name,
    //     base64,
    //     pixiJson,
    //     originImgUrls:imgUrls,
    //   });
    // });
  }

  submitBasicTitle(name){
    this.setState({
      name
    })
  }

  sortEnd(evt){

    var {imgUrls} = this.state;

    var {oldIndex,newIndex} = evt;

    var old = imgUrls.splice(oldIndex,1);

    imgUrls.splice(newIndex,0,old[0]);
  }

  resizeSubmit(refKey,index){

    var resizeNumber = parseInt(this.refs[refKey].value)

    if(isNaN(resizeNumber)){
      resizeNumber = 1
    }
    
    
  }

  createPreviewCanvas(url){

    // var canvas = document.createElement('canvas')
    // var context = canvas.getContext('2d')
    // canvas.width = 640
    // canvas.height = 1004
    //
    // var img = new Image
    // img.src = url
    // img.onload = ()=>{
    //   context.drawImage(img,0,0)
    // }
    //
    // return canvas
  }

  render() {
    var {name,imgUrlObjs} = this.state;

    var saveDisabled = imgUrlObjs.length < 1 ? 'weui_btn_disabled':'';

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
            <FileUpload 
              upload={false}
              onUploadCompleted={this.addNewImg.bind(this)} 
              >
              <button className="weui_btn weui_btn_mini weui_btn_primary" >添加</button>
            </FileUpload>
            <button onClick={this.save.bind(this)} className={`weui_btn weui_btn_mini weui_btn_primary ${saveDisabled}`} >保存</button>
          </div>
        </header>


        <div ref="imagesBox" className="images-box">

          <Sortable className="images" option={{onEnd:this.sortEnd.bind(this)}}>
            {imgUrlObjs.map((imgUrlObj,i)=>{

              var {url} = imgUrlObj

              var key = `img${i}`;

              var refKey = `ref${key}`

              return (
                <li key={key}>
                  <div className="close" onClick={this.remove.bind(this,i)}></div>
                  <canvas ref={key} className="preview-img" width="640" height="1004"></canvas>
                  <div className="basic-operations">
                    <p>
                      <input className="resize-input" type="text" ref={refKey} placeholder="放大倍数" id={key} />
                      <button className="resize-btn" onClick={this.resizeSubmit.bind(this,refKey,i)}>确定</button>
                    </p>
                  </div>
                </li>
              )
            })}
          </Sortable>
        </div>

      </div>
    )
  }
}

TexturePacker.defaultProps = defaultProps;

TexturePacker.propTypes = propTypes;

var TexturePackerFn = React.createFactory(TexturePacker);

module.exports = function (props) {

  return Popup(TexturePackerFn(props),{
    width:650,
  })
};
