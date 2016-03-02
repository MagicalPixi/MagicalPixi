require('./BasicList.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

let ItemList = require('../../componentsLayout/ItemList');

class BasicList extends Component {

  componentDidMount(){

  }

  newAdd() {
  }
  edit(){
  }

  render() {
    return (
      <div id="basicList">

        <header className="top-container">

          <h3 className="title" >
          原始素材
          </h3>

          <a href="edit" >
            <button onClick={this.newAdd.bind(this)}
              className="weui_btn weui_btn_mini weui_btn_primary add-new">+&nbsp;新建场景</button>
          </a>

        </header>

        <ItemList>
          {this.props.data.map((scene,i)=>{

            let {_id,basicTitle} = scene;


            return (
              <li key={"scene"+i} className="material-one" >
                <span className="name">
                  {basicTitle}
                </span>

                <a className="operation"
                  onClick={this.edit.bind(this)}
                  href='' >编辑</a>

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
