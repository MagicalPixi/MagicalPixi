require('./AsideMenu.scss');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import autoBind from 'react-autobind'

var propTypes = {
  menuItems:T.array
};

var defaultProps = {
  menuItems:[]
};

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  render() {

    let {menuItems} = this.props;

    return (
      <div id="asideMenu">
        <ul className="menu-list">
          {menuItems.map((menuObj, i)=> {

            var {name,active} = menuObj;

            return (
              <li data-state={active}>
                {name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
AsideMenu.propTypes = propTypes;

AsideMenu.defaultProps = defaultProps;

module.exports = AsideMenu;
