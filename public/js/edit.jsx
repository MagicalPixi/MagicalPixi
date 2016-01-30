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

import { createStore, combineReducers,bindActionCreators, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider,connect } from 'react-redux'

import {editReducer} from './reducers'

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

            <ConsolePanel />
          </FlexBox>
        </FixedBox>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    gamViewSprites: state.gamViewSprites
  }
}

let configureCreateStore = applyMiddleware(
  thunk
)(createStore);

let store = configureCreateStore(editReducer);

let ConnectedApp = connect(
  mapStateToProps
)(Edit);


ReactDOM.render(
  <Provider store={store} >
    <ConnectedApp />
  </Provider>,
  document.querySelector('#topContainer')
);