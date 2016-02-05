require('../styles/edit.scss');
require('../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');

let Navbar = require('../componentsLayout/Navbar');

let GameContainer = require('../components/GameContainer');

let GameView = require('../components/GameView');

let FixedBox = require('../componentsLayout/FixedBox');
let FlexBox = require('../componentsLayout/FlexBox');

let routerList = require('./routerEdit');


class Edit extends React.Component {

  render(){
    log('EDIT:',this.props);

    return (
      <div>
        <Navbar mode="left"/>

        <FixedBox top="66">

          <FlexBox childrenWidth={[undefined,600]}>
            <GameContainer>
              <GameView />
            </GameContainer>

            {routerList}
          </FlexBox>
        </FixedBox>
      </div>
    )
  }
}


ReactDOM.render(
  <Edit></Edit>,
  document.querySelector('#topContainer')
);