require('./cascadeList.scss');

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'

const T = React.PropTypes;

class CascadeList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let { data } = this.props;

    return (
      <div className="cascade-list">
        <ul className="layouts">
          {data.map((layoutOne,i)=>{

            let { name,children=[] } = layoutOne;
            let key = `layout${i}`;

            return (
              <li key={key}>
                <p className="layout-name" >{name}</p>
                <ol className="children">
                  {children.map(function (sprite,ii) {

                    let childKey = `children${ii}`;

                    return (
                      <li key={childKey} >精灵1</li>
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

module.exports = CascadeList;