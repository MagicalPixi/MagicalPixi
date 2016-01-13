
require('./index.scss');

let React = require('react');

let List = require('../List/index');

let SpritePreview = require('../../components/SpritePreview');
let Download = require('../../componentFunctional/Download');

class MaterialsList extends React.Component {

  edit(){

    SpritePreview({
      name:'测试'
    });

  }

  download(){

  }

  render(){
    return (
      <div id="mpMaterialsList" >
        <h3 className="material-title" >
          精灵列表
        </h3>
        <List>
          <p className="material-one" >
            <span className="name">
              测试素材名字
            </span>

            <span className="operation" onClick={this.download.bind(this)} href="javascript:void 0">
              <Download materialName="背景色" >
              下载
              </Download>
            </span>
            <a className="operation" onClick={this.edit.bind(this)} href="javascript:void 0">编辑</a>
          </p>
        </List>
      </div>
    )
  }
}
//            <a className="operation" onClick={this.download.bind(this)} href="javascript:void 0">下载</a>

module.exports = MaterialsList;