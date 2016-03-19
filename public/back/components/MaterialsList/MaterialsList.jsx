
require('./MaterialsList.scss');

let React = require('react');

const T = React.PropTypes;

let ItemList = require('../../componentsLayout/ItemList');

let SpritePreview = require('../SpritePreview');
let Download = require('../../componentsFunctional/Download');
let DeleteSprite = require('../../componentsFunctional/DeleteSprite');


var propTypes = {
  data:T.array.isRequired,
  basics:T.array
};

var defaultProps = {
  data:[],
  basics:[],
};

class MaterialsList extends React.Component {

  newMaterial(){
    var {basics} = this.props;

    SpritePreview({
      resources:basics
    });
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

    var { data,resources} = this.props;

    return (
      <div id="mpMaterialsList" >
        <header className="top-container">

          <h3 className="title" >
          精灵列表
          </h3>

          <button onClick={this.newMaterial.bind(this)} className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建素材</button>

        </header>

        <ItemList>
          {data.map((sprite,i)=>{

            let {_id,name,resourceUrl,type,properties} = sprite;

            let queryForm = {
              name,
              id:_id
            };

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
                  <Download query={queryForm} >
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

MaterialsList.defaultProps = defaultProps;
MaterialsList.propTypes = propTypes;

module.exports = MaterialsList;