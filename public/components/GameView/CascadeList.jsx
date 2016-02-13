require('./CascadeList.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import EditText from '../../componentsBasic/EditText'

const T = React.PropTypes;



class CascadeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex:0
    }
  }

  selectContainer(index,layoutOne){
    this.props.onSelectContainer(index,layoutOne);
    this.setState({
      currentIndex:index
    })
  }

  render() {
    let {currentIndex} = this.state;
    let { data } = this.props;

    return (
      <div className="cascade-list">
        <ul className="layouts">
          {data.map((layoutOne,i)=>{

            let { name,children=[] } = layoutOne;
            let key = `layout${i}`;

            let selected = currentIndex === i;

            return (
              <li data-selected={selected} key={key}>
                <EditText
                  onClick={this.selectContainer.bind(this,i,layoutOne)}
                  value={name}
                />
                <ol className="children">
                  {children.map(function (sprite,ii) {
                    let {spriteName } =  sprite;

                    let childKey = `children${ii}`;

                    return (
                      <li key={childKey} >{spriteName}</li>
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
  onSelectContainer:T.func.isRequired
};

module.exports = CascadeList;