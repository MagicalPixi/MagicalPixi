require('./index.scss');

let React = require('react');

class ContentsBox extends React.Component {

  render() {

    return (
      <div className="contents-box" >
        <div className="left-part">
          {this.props.children[0]}
        </div>
        <div className="right-part">
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}

module.exports = ContentsBox;