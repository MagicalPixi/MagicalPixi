
require('./index.scss');

let React = require('react');

let List = require('../../componentFunctional/List');

let SpritePreview = require('../../components/SpritePreview');
let Download = require('../../componentFunctional/Download');

class MaterialsList extends React.Component {

  newMaterial(){
    SpritePreview();
  }

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
        <header className="top-container">

          <h3 className="material-title" >
          精灵列表
          </h3>

          <button onClick={this.newMaterial.bind(this)} className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建素材</button>

        </header>

        <List>
          <li className="material-one" >
            <span className="name">
              测试素材名字
            </span>

            <span className="operation" onClick={this.download.bind(this)} href="javascript:void 0">
              <Download materialName="背景色" >
              下载
              </Download>
            </span>
            <a className="operation" onClick={this.edit.bind(this)} href="javascript:void 0">编辑</a>
          </li>
          <li className="material-one" >
            <span className="name">
            测试素材名字
            </span>

            <span className="operation" onClick={this.download.bind(this)} href="javascript:void 0">
              <Download materialName="背景色" >
              下载
              </Download>
            </span>
            <a className="operation" onClick={this.edit.bind(this)} href="javascript:void 0">编辑</a>
          </li>
        </List>
      </div>
    )
  }
}
//            <a className="operation" onClick={this.download.bind(this)} href="javascript:void 0">下载</a>

module.exports = MaterialsList;