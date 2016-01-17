require('./index.scss');

let React = require('react');

class AsideBoard extends React.Component {

  render(){
    return (
      <div id="asideBoard">
        <div className="function-one material">
          <h3 className="title" >
            <i className="icon"></i>
            素材管理
          </h3>
          <ul className="child-list">
            <li>
              精灵
            </li>
          </ul>
        </div>

      </div>
    )
  }
}

module.exports = AsideBoard;