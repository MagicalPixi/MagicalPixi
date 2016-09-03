require('./AsideMenu.scss');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import autoBind from 'react-autobind'

var propTypes = {
  menuItems:T.array,
  showAdd:T.bool,
  onClickTab:T.func,
  onAddTab:T.func,
};

var defaultProps = {
  menuItems:[],
  onClickTab:_=>_,
  onAddTab:_=>_,
  showAdd:true,
};

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  clickOnList(e){
    var {menuItems,onClickTab} = this.props;

    var index = e.target.dataset.index;

    onClickTab(menuItems[index]);
  }

  add(){
    var name = prompt('分类名');
    if(name){
      this.props.onAddTab(name);
    }
  }

  render() {

    var {showAdd,menuItems} = this.props;

    return (
      <div id="asideMenu">
        <ul className="menu-list" onClick={this.clickOnList}>
          {menuItems.map((menuObj, i)=> {

            var {name,active} = menuObj;

            var key=`${name}-${i}`

            return (
              <li key={key} data-state={active} data-index={i}>
                {name}
              </li>
            )
          })}

          {showAdd?
            <li className="add" onClick={this.add}>+</li>:''
          }

        </ul>
      </div>
    )
  }
}
AsideMenu.propTypes = propTypes;

AsideMenu.defaultProps = defaultProps;

module.exports = AsideMenu;
