require('./AsideBoard.scss');

let React = require('react');

class AsideBoard extends React.Component {

  render() {
    return (
      <div id="asideBoard">
        <div className="function-one scene">
          <h3 className="title" >
            <i className="icon"></i>
            场景
          </h3>
          <ul className="child-list">
            <li>
              <a href='#scene'>
              基本场景
              </a>
            </li>
          </ul>
        </div>
        <div className="function-one material">
          <h3 className="title" >
            <i className="icon"></i>
            素材
          </h3>
          <ul className="child-list">
            <li>
              <a href="#sprite" >
              精灵
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = AsideBoard;