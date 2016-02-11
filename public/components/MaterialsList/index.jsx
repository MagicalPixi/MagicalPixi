
require('./index.scss');

let React = require('react');

let ItemList = require('../../componentsLayout/ItemList');

let SpritePreview = require('../SpritePreview/index');
let Download = require('../../componentFunctional/Download');
let DeleteSprite = require('../../componentFunctional/DeleteSprite');

class MaterialsList extends React.Component {

  newMaterial(){
    SpritePreview();
  }

  edit(_id,resourceUrl,type,properties){
    SpritePreview({
      id:_id,
      resourceUrl,
      type,
      properties
    });
  }

  render(){
    return (
      <div id="mpMaterialsList" >
        <header className="top-container">

          <h3 className="title" >
          精灵列表
          </h3>

          <button onClick={this.newMaterial.bind(this)} className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建素材</button>

        </header>

        <ItemList>
          {this.props.data.map((sprite,i)=>{

            let {_id,name,resourceUrl,type,properties} = sprite;

            return (
              <li key={"material"+i} >
                <span>
                  {sprite.name}
                </span>

                <span className="operation delete">
                  <DeleteSprite data={{id:_id}}>
                    删除
                  </DeleteSprite>
                </span>

                <a className="operation" onClick={this.edit.bind(this,_id,resourceUrl,type,properties)} href="javascript:void 0">编辑</a>

                <span className="operation" href="javascript:void 0">
                  <Download materialName={name} >
                  下载
                  </Download>
                </span>

              </li>
            )
          })}
        </ItemList>
      </div>
    )
  }
}

module.exports = MaterialsList;