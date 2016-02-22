
require('./ScenesList.scss');

let React = require('react');

let ItemList = require('../../componentsLayout/ItemList');

let SpritePreview = require('../SpritePreview/index');
let Download = require('../../componentsFunctional/Download');
let DeleteSprite = require('../../componentsFunctional/DeleteSprite');

class ScenesList extends React.Component {

  componentDidMount(){

    this.props.actions.initSceneData();
  }

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

          <a href="edit" >
            <button onClick={this.newAdd.bind(this)}
              className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建场景</button>
          </a>

        </header>

        <ItemList>
          {this.props.data.map((scene,i)=>{

            let {_id,sceneTitle} = scene;

            let editHref = `/index/edit?id=${_id}`;

            return (
              <li key={"scene"+i} className="material-one" >
                <span className="name">
                  {sceneTitle}
                </span>

                <a className="operation"
                  onClick={this.edit.bind(this)}
                  href={editHref} >编辑</a>

              </li>
            )
          })}

        </ItemList>
      </div>
    )
  }

}

ScenesList.defaultProps = {
  data:[]
}

module.exports = ScenesList;