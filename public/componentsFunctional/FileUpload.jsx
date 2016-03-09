let React = require('react');
let T = React.PropTypes;

let _ = require('lodash');

let ajax = require('../libs/ajax');

let getUploadKeyByExt = function (names) {
  let regs = [{
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

let API = require('../js/API');

let body = document.querySelector('body');

class FileUpload extends React.Component {

  click(){
    let inputEle = document.createElement('input');
    inputEle.type = 'file';
    inputEle.multiple = true;
    inputEle.style.display = 'none';

    body.appendChild(inputEle);

    inputEle.addEventListener('change',(e)=>{

      let fileList = inputEle.files;

      inputEle.remove();

      //ajax上传...
      let fd = new FormData();

      let keys = getUploadKeyByExt(_.map(fileList,file=>{
        return file.name;
      }));

      _.forEach(fileList,(file,i)=>{
        if(keys[i]){
          fd.append(keys[i],file);
        }
      });

      ajax(API.fileUpload).post(fd).then((r)=>{
        let {url} = r;

        this.props.onUploadCompleted(url);
      })
    });

    //inputEle.click();
    setTimeout(function () {
      inputEle.click();
    },100);
  }

  //拖动上传
  drop(e){
    log(e);
  }

  render(){
    return (
      <a href="javascript:void 0" onClick={this.click.bind(this)} onDrop={this.drop.bind(this)}>
        {this.props.children}
      </a>
    )
  }
}

FileUpload.propTypes = {
  onUploadCompleted:T.func.isRequired
};

module.exports = FileUpload;