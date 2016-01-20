
require('./index.scss');

let React = require('react');

let ItemList = require('../ItemList');

let SpritePreview = require('../../components/SpritePreview');
let Download = require('../../componentFunctional/Download');
let DeleteSprite = require('../../componentFunctional/DeleteSprite');

class ScenesList extends React.Component {

  newAdd(){

  }

  edit(){

  }

  render(){
    return (
      <div id="mpScenesList" >
        <header className="top-container">

          <h3 className="title" >
          场景列表
          </h3>

          <button onClick={this.newAdd.bind(this)} className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建场景</button>

        </header>

        <ItemList>
          {this.props.data.map((sprite,i)=>{

            let {_id,name,resourceUrl,type,properties} = sprite;

            return (
              <li key={"scene"+i} className="material-one" >
                <span className="name">
                  {sprite.name}
                </span>

                <a className="operation" onClick={this.edit.bind(this,_id,resourceUrl,type,properties)} href="javascript:void 0">编辑</a>

              </li>
            )
          })}

          <li >
            <span>
            1
            </span>

            <a className="operation" href="javascript:void 0">编辑</a>

          </li>
        </ItemList>
      </div>
    )
  }

}

ScenesList.defaultProps = {
  data:[]
}

module.exports = ScenesList;