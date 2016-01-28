require('../styles/edit.scss');
require('../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');

let Navbar = require('../componentsLayout/Navbar');

let GameContainer = require('../components/GameContainer');
let ConsolePanel = require('../components/ConsolePanel');

let GameView = require('../components/GameView');

let FixedBox = require('../componentsLayout/FixedBox');
let FlexBox = require('../componentsLayout/FlexBox');

window.R = React;

class Edit extends React.Component {

  render(){
    return (
      <div>
        <Navbar mode="left"/>

        <FixedBox top="66">
          <FlexBox childrenWidth={[undefined,600]}>
            <GameContainer>
              <GameView />
            </GameContainer>

            <ConsolePanel />
          </FlexBox>
        </FixedBox>
      </div>
    )
  }
}

ReactDOM.render(
  React.createElement(Edit),
  document.querySelector('#topContainer')
);