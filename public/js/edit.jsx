require('../styles/edit.scss');
require('../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');
let { bindActionCreators } = require('redux')

let { Provider,connect } = require('react-redux')

let Navbar = require('../componentsLayout/Navbar');

let GameContainer = require('../components/GameContainer');

let GameView = require('../components/GameView');
let GameViewActions = require('./actions/gameView');

let ConsolePanel = require('../components/ConsolePanel');

let FixedBox = require('../componentsLayout/FixedBox');
let FlexBox = require('../componentsLayout/FlexBox');

let {createMyStore} = require('../common/routerBuild');
let {editReducers} = require('./reducers');

let {createRouterList} = require('./routerEdit');

let editStore = createMyStore(editReducers,{
  withRouter:true,
  initialState:{
    viewData:[],
    consoleTab:'material',
    consoleData:[]
  }
});

let routerList = createRouterList(editStore);

class Edit extends React.Component {
  render(){
    log('EDIT:',this.props);

    let {viewData,actions} = this.props;

    return (
      <div>
        <Navbar mode="left"/>

        <FixedBox top="66">

          <FlexBox childrenWidth={[undefined,600]}>
            <GameContainer>
              <GameView actions={actions} data={viewData}/>
            </GameContainer>

            {routerList}
          </FlexBox>
        </FixedBox>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    viewData: state.viewData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameViewActions, dispatch)
  }
}

let ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);

ReactDOM.render(
  <Provider store={editStore}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#topContainer')
);