require('./index.scss');

let React = require('react');

class Navbar extends React.Component {

  render() {
    return (
      <header id="mpNavbar">
        <nav>
          <img src="/images/mp_logo.png" height="100%" />
          <h1>
            MagicalPixi
          </h1>
        </nav>
      </header>
    )
  }
}


module.exports = Navbar;