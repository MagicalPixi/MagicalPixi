var React = require('react');
var ReactDOM = require('react-dom');
var T = React.PropTypes;

var _ = require('lodash');

var ajax = require('../../libs/ajax');

var getUploadKeyByExt = function (names) {
  var regs = [{
    reg:/\.png$/,
    key:'png'
  },{
    reg:/\.json$/,
    key:'json'
  }];

  return _.map([].concat(names).slice(0,2),name=>{
    return _.map(regs,reg=>{
      return reg.reg.test(name) ? reg.key:null;
    }).filter(key=>{
      return key !== null;
    })[0];
  });
};

var API = require('../../libs/API');

var body = document.querySelector('body');

class FileUpload extends React.Component {

  //设定样式
  componentDidMount(){
    var fileBtn = this.refs.uploadFileButton;
    var fileInput = this.refs.hiddenFileInput;

    var fileBtnWidth = `${parseInt(getComputedStyle(fileBtn).width)}px`;
    var fileBtnHeight = `${parseInt(getComputedStyle(fileBtn).height)}px`;

    fileInput.style.width = fileBtnWidth;
    fileInput.style.height = fileBtnHeight;
  }

  //click(){
  //  var inputEle = document.createElement('input');
  //  inputEle.type = 'file';
  //  inputEle.multiple = true;
  //  inputEle.style.display = 'none';
  //
  //  body.appendChild(inputEle);
  //
  //  inputEle.addEventListener('change',(e)=>{
  //
  //    var fileList = inputEle.files;
  //
  //    inputEle.remove();
  //
  //    //ajax上传...
  //    var fd = new FormData();
  //
  //    var keys = getUploadKeyByExt(_.map(fileList,file=>{
  //      return file.name;
  //    }));
  //
  //    _.forEach(fileList,(file,i)=>{
  //      if(keys[i]){
  //        fd.append(keys[i],file);
  //      }
  //    });
  //
  //    ajax(API.fileUpload).post(fd).then((r)=>{
  //      var {url} = r;
  //
  //      this.props.onUploadCompvared(url);
  //    })
  //  });
  //
  //  //inputEle.click();
  //  setTimeout(function () {
  //    inputEle.dispatchEvent(new Event('click'));
  //  },100);
  //}

  change(e){
    var inputEle = e.target;
    var fileList = inputEle.files;

    if(fileList.length === 0){
      return;
    }
    //ajax上传...
    var fd = new FormData();

    var keys = getUploadKeyByExt(_.map(fileList, file=> {
      return file.name;
    }));

    _.forEach(fileList, (file, i)=> {
      if (keys[i]) {
        fd.append(keys[i], file);
      }
    });

    ajax(API.fileUpload).post(fd).then((r)=> {
      var {url} = r;

      this.props.onUploadCompleted(url);
    });
  }

  render(){

    var button = this.props.children;

    button = React.cloneElement(button,{
      ref:'uploadFileButton'
    });

    return (
      <a href="javascript:void 0" style={{position:'relative'}}>
        <input onChange={this.change.bind(this)} ref="hiddenFileInput" type="file" accept="image/png,application/json" style={{
          position:'absolute',
          left:0,
          opacity:0,
          zIndex:1
        }} />
        {button}
      </a>
    )
  }
}

FileUpload.propTypes = {
  onUploadCompleted:T.func.isRequired
};

module.exports = FileUpload;