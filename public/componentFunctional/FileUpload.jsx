let React = require('react');
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

class FileUpload extends React.Component {

  click(){
    var inputEle = document.createElement('input');
    inputEle.type = 'file';
    inputEle.multiple = true;
    console.log('display');
    inputEle.addEventListener('change',(e)=>{
      console.log(e);
      console.log(inputEle.files);

      let fileList = inputEle.files;

      window.fileList = fileList;
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

      ajax('/api/fileUpload').post(fd).then((r)=>{
        let {url} = r;

        this.props.uploadDone(url);
      })
    });
    inputEle.click();
  }

  //拖动上传
  drop(e){
    console.log(e);
  }

  render(){
    return (
      <a href="javascript:void 0" onClick={this.click.bind(this)} onDrop={this.drop.bind(this)}>
        {this.props.children}
      </a>
    )
  }
}


module.exports = FileUpload;