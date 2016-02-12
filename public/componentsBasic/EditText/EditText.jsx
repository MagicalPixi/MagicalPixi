import React,{Component} from 'react'
import ReactDOM from 'react-dom'

const T = React.PropTypes;

class EditText extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    let {style} = this.props;

    return (
      <p style={style} >
        <input />
      </p>
    )
  }
}

module.exports = EditText;