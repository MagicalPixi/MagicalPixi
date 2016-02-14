require('./CascadeList.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import EditText from '../../componentsBasic/EditText'

let Sortable = require('../../libs/sortable');

const T = React.PropTypes;

class CascadeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex:0
    }
  }
  componentDidMount(){
    new Sortable(this.refs.containers)
  }

  selectContainer(index,layoutOne){
    this.props.onSelectContainer(index,layoutOne);
    this.setState({
      currentIndex:index
    })
  }

  changeContainerName(index,containerName){
    this.props.onChangeContainerName(index,containerName);
  }

  render() {
    let {currentIndex} = this.state;
    let { data } = this.props;

    return (
      <div className="cascade-list">
        <ul ref="containers" className="layouts">
          {data.map((layoutOne,i)=>{

            let { name,children=[] } = layoutOne;
            let key = `layout${i}`;

            let selected = currentIndex === i;

            name = `${name}(${children.length})`;

            return (
              <li data-selected={selected} key={key}>
                <EditText
                  onClick={this.selectContainer.bind(this,i,layoutOne)}
                  onSubmit={this.changeContainerName.bind(this,i)}
                  value={name} />

                <ol className="children">
                  {children.map(function (sprite,ii) {
                    let {spriteName } =  sprite;

                    let childKey = `children${ii}`;

                    return (
                      <li key={childKey} >
                        {spriteName}
                        <p className="operations">
                          <span className="delete">
                          </span>
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

CascadeList.propTypes = {
  onSelectContainer:T.func.isRequired,
};

module.exports = CascadeList;