require('./SelectResource.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

import autoBind from 'react-autobind'

import FloatItem from '../FloatItems'

var propTypes = {
  spriteResource:T.array.isRequired
};

var defaultProps = {

};

class SelectResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecting:false,
    };
    autoBind(this);
  }

  select(e){
    var {selecting} = this.state;

    var i = parseInt(e.currentTarget.getAttribute('data-index'));

    this.setState({
      selecting:i === selecting ? false : i
    });
  }

  getResourceList(index){
    var {spriteResource} = this.props;
    var resourceList = [
      spriteResource
    ];

    return resourceList[index] || spriteResource;
  }

  render() {
    var {selecting} = this.state;

    var finalResourceList = [];

    if(selecting !== false){
      finalResourceList = this.getResourceList(selecting);
    }

    return (
      <div id="selectResource">

        <ul className="tabs">

          <li data-index="0" onClick={this.select} >
            <img src="/images/example.jpg" />
          </li>

        </ul>

        <div className="resource-box" data-state={selecting} >
          <FloatItem
            title="精灵"
            data={finalResourceList}
            />
        </div>

      </div>
    )
  }
}
SelectResource.propTypes = propTypes;

SelectResource.defaultProps = defaultProps;

module.exports = SelectResource;
