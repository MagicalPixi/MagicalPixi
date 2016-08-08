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

function resizeImageData(canvas,resize){

  var {width,height} = canvas
  var context = canvas.getContext('2d')

  var imgData = context.getImageData(0,0,width,height).data

  var resizedData = pixiLib.utils.resizeImageData(imgData,width * 4,resize,resize,4)

  var resizedImageData = new ImageData(width * resize,height * resize)

  resizedData.forEach((v,i)=>{
    resizedImageData.data[i] = v
  })

  canvas.width = width * resize
  canvas.height = height * resize

  context.putImageData(resizedImageData,0,0)
}

class TexturePacker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:props.name,
      imgUrls:props.imgUrls,
      imgUrlObjs:props.imgUrls.map(url=>{
        //兼容
        url = url.url ? url.url : url
        var resize = url.resize ? url.resize : 1;

        return {
          url,
          resize,
        }
      })
    };

    autobind(this)
  }

  componentDidMount(){

    this.drawImageByImgObj()
  }

  componentDidUpdate(){
    this.drawImageByImgObj()
  }


  
  drawImageByImgObj(){
    var {imgUrlObjs} = this.state;

    imgUrlObjs.forEach(({url,resize},i)=>{

      var canvas = this.getContextByIndex(i,true)
      var context = this.getContextByIndex(i)

      if(!canvas.drawed){
        var img = new Image()
        img.src = url
        img.onload = ()=>{

          var {width,height} = img;

          canvas.drawed = true;
          canvas.width = width
          canvas.height = height
          context.drawImage(img,0,0)

          if(resize > 1) {

            resizeImageData(canvas,resize)

            //
            // var imgData = context.getImageData(0, 0, width, height).data
            //
            // var resizedData = pixiLib.utils.resizeImageData(imgData, width * 4, resize, resize, 4)
            //
            // var resizedImageData = new ImageData(width * resize, height * resize)
            //
            // resizedData.forEach((v, i)=> {
            //   resizedImageData.data[i] = v
            // })
            //
            // canvas.width = width * resize
            // canvas.height = height * resize
            //
            // context.putImageData(resizedImageData, 0, 0)
          }
        }
      }
    })
  }

  getContextByIndex(index,getCanvas){
    var canvasRefKey = `img${index}`

    var canvas = this.refs[canvasRefKey]

    return getCanvas ? canvas : canvas.getContext('2d')
  }

  addNewImg(url){
    var {imgUrlObjs} = this.state;

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

    imgUrlObjs.splice(index,1)

    imgUrlObjs = imgUrlObjs.slice();

    this.setState({
      imgUrlObjs
    })
  }
  save(){
    var { name,imgUrlObjs } = this.state;


    if(imgUrlObjs.length < 1){
      return;
    }

    var afterWrapperImages = wrapperImages(imgUrlObjs.map((obj,i)=>{
      return this.getContextByIndex(i,true)
    }))

    var base64 = getBase64FromImages(afterWrapperImages);

    var pixiJson = getPixiJsonFromImages(afterWrapperImages);

    var type = imgUrlObjs.length > 1 ? pixiLib.types.SPRITE_MC : pixiLib.types.SPRITE_IM;

    this.props.onCompleted({
      type,
      name,
      base64,
      pixiJson,
      originImgUrls: imgUrlObjs,
    });
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

    var {imgUrlObjs} = this.state;

    var {oldIndex,newIndex} = evt;

    var old = imgUrlObjs.splice(oldIndex,1);

    imgUrlObjs.splice(newIndex,0,old[0]);
  }

  resizeSubmit(refKey,index){

    var {imgUrlObjs} = this.state;

    var canvas = this.getContextByIndex(index,true)
    var context = this.getContextByIndex(index)

    var oldResizeNumber = imgUrlObjs[index].resize;

    var resizeNumber = parseInt(this.refs[refKey].value)


    if(isNaN(resizeNumber)){
      resizeNumber = parseInt(resizeNumber/oldResizeNumber) || 1;
    }

    resizeImageData(canvas,resizeNumber)

    // var  {width,height} = canvas
    //
    // var imgData = context.getImageData(0,0,width,height).data
    //
    // var resizedData = pixiLib.utils.resizeImageData(imgData,width * 4,resizeNumber,resizeNumber,4)
    //
    // var resizedImageData = new ImageData(width * resizeNumber,height * resizeNumber)
    //
    // resizedData.forEach((v,i)=>{
    //   resizedImageData.data[i] = v
    // })
    //
    // canvas.width = width * resizeNumber
    // canvas.height = height * resizeNumber
    //
    // context.putImageData(resizedImageData,0,0)

    imgUrlObjs = imgUrlObjs.map((urlObj,i)=>{

      if(i === index){
        urlObj.resize = resizeNumber
      }

      return urlObj
    })

    this.setState({
      imgUrlObjs
    })
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

              var {url,resize} = imgUrlObj

              var key = `img${i}`;

              var refKey = `ref${key}`

              return (
                <li key={key}>
                  <div className="close" onClick={this.remove.bind(this,i)}></div>
                  <canvas ref={key} className="preview-img" width="640" height="1004"></canvas>
                  <div className="basic-operations">
                    <p>
                      <input className="resize-input" type="text" ref={refKey} defaultValue={resize} placeholder="放大倍数" id={key} />
                      <input className="resize-input" type="text" value={resize} readOnly placeholder="放大倍数" id={key} />
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
