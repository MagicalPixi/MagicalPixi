require('./Navbar.scss');

let React = require('react');

let modeMap = {
  left:'auto',
  center:'1000px'
};

class Navbar extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      width:modeMap[props.mode] || modeMap.center
    }
  }

  render() {

    let style = {
      width:this.state.width
    };

    return (
      <header id="mpNavbar">
          <nav style={style} >
            <a href="/index/index#scene">
              <img src="/images/mp_logo.png" height="100%" />
              <p>
                MagicalPixi
              </p>
            </a>
          </nav>

        {this.props.children}

      </header>
    )
  }
}


module.exports = Navbar;
