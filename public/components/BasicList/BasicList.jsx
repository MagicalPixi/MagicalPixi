require('./BasicList.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

let ItemList = require('../../componentsLayout/ItemList');

let TexturePacker = require('../TexturePacker');

class BasicList extends Component {

  componentDidMount(){

  }

  newAdd() {

    var close = TexturePacker({
      onCompleted:(basicObj)=>{

        this.props.actions.basicAdd(basicObj);

        requestAnimationFrame(close);
      }
    });
  }
  edit(basicObj){

    var close =  TexturePacker({
      name:basicObj.name,
      imgUrls:basicObj.originImgUrls || [],

      onCompleted:(textureBasicObj)=>{

        this.props.actions.basicAdd(Object.assign({},basicObj,textureBasicObj));

        requestAnimationFrame(close);
      }
    });
  }

  render() {
    return (
      <div id="basicList">

        <header className="top-container">

          <h3 className="title" >原始素材</h3>

          <a href="javascript:void 0" >
            <button onClick={this.newAdd.bind(this)}
              className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建Basic</button>
          </a>

        </header>

        <ItemList>
          {this.props.data.map((basicObj,i)=>{

            let {_id,name} = basicObj;

            return (
              <li key={"scene"+i} className="material-one" >
                <span className="name">
                  {name}
                </span>

                <a className="operation"
                  onClick={this.edit.bind(this,basicObj)}
                  href='javascript:void 0' >编辑</a>

              </li>
            )
          })}

        </ItemList>

      </div>
    )
  }
}
BasicList.defaultProps = {
  data:[]
};
BasicList.propTypes = {

};
module.exports = BasicList;
