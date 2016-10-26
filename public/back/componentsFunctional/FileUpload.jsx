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

  change(e){
    var {upload} = this.props;

    var inputEle = e.target;
    var fileList = inputEle.files;

    if(fileList.length === 0){
      return;
    }

    if(upload) {
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

      // ajax(`http://localhost:6770/upload`).post(fd).then((r)=> {
      //   var {url} = r;
      //
      //   this.props.onUploadCompleted(url);
      // });
    }else{

      var reader = new FileReader()
      reader.readAsDataURL(fileList[0])
      reader.onload = ()=>{
        this.props.onUploadCompleted(reader.result)
      }
    }
    
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

FileUpload.defaultProps = {
  upload:true, // 默认会触发上传,false返回一个fileReader对象
}

FileUpload.propTypes = {
  onUploadCompleted:T.func.isRequired,
  upload:T.bool
};

module.exports = FileUpload;