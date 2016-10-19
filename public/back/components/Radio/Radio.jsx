require('./Radio.scss');

import ReactDOM from 'react-dom'
const T = React.PropTypes;

var propTypes = {
};

  items: []
};

    }
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.selected
    autoBind(this);
  }

  select(value) {
    if (this.props.onSelect) {
      this.props.onSelect(value, this.props.name)
    }
    this.setState({
      selected: value
    })
  }

  render(){
    let children = this.props.items.map((item, index) => {
      console.log(item.value == this.state.selected)
      return <RadioItem value={item.value} onClick={this.select} index={index} selected={item.value == this.state.selected} content={item.content}/>
    })
    return (
      <div className="mp_radio">
        {children}
      </div>
    )
  }
}
Radio.propTypes = propTypes;

