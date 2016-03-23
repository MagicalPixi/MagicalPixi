require('./SelectBasicResource.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes;

var propTypes = {
  onSelect:T.func.isRequired,
  resources:T.array.isRequired
};

var defaultProps = {
  resources:[]
};

class SelectBasicResource extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.select = this.select.bind(this);
  }

  select(e){
    var {resources,onSelect} = this.props;
    var index = parseInt(e.currentTarget.getAttribute('data-index'));

    onSelect(resources[index]);
  }

  render() {

    var {resources} = this.props;

    return (
      <div id="selectBasicResource">
        <ul className="resources">
        {resources.map((basic,i)=>{
          var {name,resourceName} = basic;
          var key = `basic${i}`;

          return (
            <li key={key} data-index={i} onClick={this.select}>
              <img src={`${resourceName}.png`} />
              <p className="name">{name}</p>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}
SelectBasicResource.propTypes = propTypes;
SelectBasicResource.defaultProps = defaultProps;

module.exports = SelectBasicResource;
