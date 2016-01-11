
require('./index.scss');

let React = require('react');

let List = require('../List/index');

let SpritePreview = require('../../components/SpritePreview');

class MaterialsList extends React.Component {

  edit(){

    SpritePreview({
      name:'测试'
    });

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

            <a className="operation" href="javascript:void 0">下载</a>
            <a className="operation" onClick={this.edit.bind(this)} href="javascript:void 0">编辑</a>
          </p>
        </List>
      </div>
    )
  }
}

module.exports = MaterialsList;