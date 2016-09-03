require('./MaterialsList.scss');

let React = require('react');
import autoBind from 'react-autobind'
const T = React.PropTypes;

let ItemList = require('../../../componentsLayout/ItemList');

import SpritePreviewPopup from '../../../componentsFunctional/SpritePreviewPopup'
let Download = require('../../../componentsFunctional/Download');
let DeleteSprite = require('../../../componentsFunctional/DeleteSprite');

import FlexBox from '../../../componentsLayout/FlexBox'
import AsideMenu from '../../../components/AsideMenu'

var propTypes = {
  data: T.object.isRequired,
  basics: T.array
};

var defaultProps = {
  basics: [],
};

function findDirectoryName(materials) {
  var targetDirectory = '';

  Object.keys(materials).map(directory=>{
    if(materials[directory].active){
      targetDirectory = directory
    }
  });

  return targetDirectory;
}

class MaterialsList extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  //保存一个精灵
  save(spriteObj) {
    var {data} = this.props;

    var directory = findDirectoryName(data);


    spriteObj = Object.assign({},spriteObj,{
      directory,
    });

    log('directory:', directory);
    log('sprite:',spriteObj);

    this.props.actions.materialSave(spriteObj);
  }

  newMaterial() {
    var {data,basics, players} = this.props;

    SpritePreviewPopup({
      resources: basics,
      resources2: players,
      onSubmit: this.save,
    });
  }

  edit(sprite) {
    SpritePreviewPopup(Object.assign({
      onSubmit: this.save,
      sprite,
    }, sprite));
  }

  clickOnMenu(tabObj){

    this.props.actions.materialTabSelect(tabObj.name)
  }

  addNewDirectory(name){
    
    this.props.actions.materialNewTab(name);
  }
  
  render() {

    var {data, resources} = this.props;


    var activeDirectoryName = '',
      menu = [],
      dataList = [];

    if(data && Object.keys(data).length > 0) {
      menu = Object.keys(data).map(directoryName=> {

        var active = data[directoryName].active;

        if (active) {
          activeDirectoryName = directoryName;
        }

        return {
          name: directoryName,
          active,
        }
      });

      dataList = data[activeDirectoryName].list.slice();
    }


    return (
      <div id="mpMaterialsList">
        <header className="top-container">

          <h3 className="title">精灵列表</h3>

          <button onClick={this.newMaterial.bind(this)} className="weui_btn weui_btn_mini weui_btn_primary add-new">
            +&nbsp;新建素材
          </button>

        </header>

        <FlexBox childrenWidth={[150,undefined]}>
          <AsideMenu
            menuItems={menu}
            onClickTab={this.clickOnMenu}
            onAddTab={this.addNewDirectory}
            >

          </AsideMenu>

          <ItemList>
            {dataList.map((sprite, i)=> {

              let {_id, name, resourceUrl, type, properties} = sprite;

              let queryForm = {
                name,
                id: _id
              };

              return (
                <li key={"material"+i}>
                <span>
                  {name}
                </span>

                <span className="operation delete">
                  <DeleteSprite data={{id:_id}}>
                    删除
                  </DeleteSprite>
                </span>

                  <a className="operation" onClick={this.edit.bind(this,sprite)} href="javascript:void 0">编辑</a>

                <span className="operation" href="javascript:void 0">
                  <Download query={queryForm}>
                  下载
                  </Download>
                </span>

                </li>
              )
            })}
          </ItemList>
        </FlexBox>
      </div>
    )
  }
}

MaterialsList.defaultProps = defaultProps;
MaterialsList.propTypes = propTypes;

module.exports = MaterialsList;