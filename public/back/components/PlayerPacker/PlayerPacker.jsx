require('./PlayerPacker.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import pixiLib from 'pixi-lib'

import Popup from '../Popup'

var propTypes = {
  childSprites:T.object
};

var defaultProps = {
  childSprites:[{
    sprite: {},
    properties: {}
  }]
};

class PlayerPacker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childSprites: props.childSprites,
      currentIndex: 0
    };
  }

  componentDidMount() {
    var previewContainer = this.refs.previewContainer;

    this.stage = pixiLib.appendStage(previewContainer);
  }

  render() {
    return (
      <div id="playerPacker">
        <h3>高级精灵</h3>


        <header className="frames">
          <ol>
            <li className="active">1</li>
            <li>2</li>
          </ol>
        </header>

        <div className="setting-box">
          <div id="previewContainer" ref="previewContainer" >
          </div>

          <div className="operation">
            <div className="setting">
            </div>
            <div className="resource">

            </div>
          </div>
        </div>
      </div>
    )
  }
}
PlayerPacker.propTypes = propTypes;

PlayerPacker.defaultProps = defaultProps;

module.exports = PlayerPacker;
