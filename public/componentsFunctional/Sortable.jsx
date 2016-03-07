import React,{Component} from 'react'
import SortableLib from '../libs/Sortable'

const T = React.PropTypes;

class Sortable extends Component {

  componentDidMount(){

    new SortableLib(this.refs.sortableUl,this.props.option)
  }

  render() {
    var {className,id,children} = this.props;

    return (
      <ul ref="sortableUl" className={className} id={id}>
      {children}
      </ul>
    )
  }
}

Sortable.defaultProps = {
  option:{}
};

Sortable.propTypes = {
  option:T.object,
  className:T.string,
  id:T.string,
};

module.exports = Sortable;