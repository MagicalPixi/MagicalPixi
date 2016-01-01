let React = require('react');

let ajax = require('../libs/ajax');

class FileUpload extends React.Component {

  click(){
    var inputEle = document.createElement('input');
    inputEle.type = 'file';
    inputEle.addEventListener('change',(e)=>{
      console.log(e);
      console.log(inputEle.files);

      let fileList = inputEle.files;

      window.fileList = fileList;
      //ajax上传...
      let fd = new FormData();
      fd.append('files',fileList[0]);



      ajax('/api/fileUpload').post(fd).then((r)=>{
        console.log(r);
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