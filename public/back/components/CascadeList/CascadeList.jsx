require('./CascadeList.scss');

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import EditText from '../../componentsBasic/EditText'

import Sortable from '../../componentsFunctional/Sortable'

import autoBind from 'react-autobind'

const T = React.PropTypes;


class CascadeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    autoBind(this)
  }

  //componentDidMount(){
  //  new Sortable(this.refs.containers,{
  //    onEnd(evt){
  //      log('onEnd:',evt);
  //      evt.stopPropagation();
  //    }
  //  })
  //}

  selectContainer(index, layoutOne) {
    this.props.onSelectContainer(index, layoutOne);
  }

  changeContainerName(index, containerName = '') {

    this.props.onChangeContainerName(index, containerName);
  }

  removeChild(containerIndex, childIndex) {
    this.props.onRemoveChild(containerIndex, childIndex);
  }

  addLayout(){
    this.props.onAddLayout();
  }

  render() {
    let {data,currentLayoutIndex} = this.props;

    let option = {
      onEnd(evt){
        log('onEnd:', evt);
        evt.stopPropagation();
      }
    };

    return (
      <div className="cascade-list">

        <Sortable className="layouts">

          {data.map((layoutOne, i)=> {

            let {name, children=[]} = layoutOne;
            let key = `layout${i}`;

            let selected = (currentLayoutIndex === i);

            name = `${name}(${children.length})`;

            return (
              <li data-selected={selected} key={key}>
                <EditText
                  onClick={this.selectContainer.bind(this,i,layoutOne)}
                  onSubmit={this.changeContainerName.bind(this,i)}
                  value={name}/>

                <ol className="children">
                  {children.map((sprite, ii)=> {

                    let {name} =  sprite;

                    let childKey = `children${ii}`;

                    return (
                      <li key={childKey}>
                        {name}
                        <p className="operations">
                          <span onClick={this.props.onChildRemove.bind(null,i,ii)} className="delete">
                          </span>
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </li>
            )
          })}
        </Sortable>



        <button onClick={this.addLayout}
                className="add-layout weui_btn weui_btn_mini weui_btn_primary" >
          +
        </button>

      </div>
    )
  }
}

CascadeList.propTypes = {
  onSelectContainer: T.func.isRequired,
  onChildRemove: T.func.isRequired,
  onChangeContainerName: T.func.isRequired,
  onAddLayout:T.func.isRequired,
  currentLayoutIndex:T.number.isRequired,
};

module.exports = CascadeList;