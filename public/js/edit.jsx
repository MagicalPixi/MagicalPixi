require('../styles/edit.scss');
require('../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');
let { bindActionCreators } = require('redux')

let { Provider,connect } = require('react-redux')

let Navbar = require('../components/Navbar');

let GameContainer = require('../components/GameContainer');

let GameView = require('../components/GameView');
let GameViewActions = require('./actions/gameView');
let SceneActions = require('./actions/scene');

let EditOperations = require('../components/EditOperations');
let ConsolePanel = require('../components/ConsolePanel');
let SceneTitle = require('../components/SceneTitle');

let FixedBox = require('../componentsLayout/FixedBox');
let FlexBox = require('../componentsLayout/FlexBox');

let {createMyStore} = require('../common/routerBuild');
let getParamsFromUrl = require('../common/getParamFromUrl');
let {editReducers} = require('./reducers');

let {createRouterList} = require('./routerEdit');

//let initialContainer = new PIXI.Container();
//initialContainer.name = '初始';

let editStore = createMyStore(editReducers,{
  withRouter:true,
  initialState:{
    viewData:[
      {
        name:'初始',
        children:[]
      }
    ],
    sceneTitle:'新建场景名',
    consoleTab:'material',
    consoleData:[]
  }
});

let routerList = createRouterList(editStore);

class Edit extends React.Component {

  componentDidMount(){

    var sceneId = getParamsFromUrl().id;

    if(sceneId){
      this.props.actions.initViewData(sceneId);
    }
  }

  render(){
    log('EDIT:',this.props);

    let {viewData,sceneTitle,actions} = this.props;

    return (
      <div>
        <Navbar mode="left" >


          <SceneTitle actions={actions} title={sceneTitle} />

          <EditOperations store={editStore} />



        </Navbar>
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
    sceneTitle: state.sceneTitle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},GameViewActions,SceneActions), dispatch)
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