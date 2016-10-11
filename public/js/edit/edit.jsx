require('../../styles/edit.scss');
require('../../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');
let { bindActionCreators } = require('redux')

let { Provider,connect } = require('react-redux')

import Navbar from '../../back/components/Navbar/index'

import GameContainer from '../layout/GameContainer/index'

import CascadeList from '../../back/components/CascadeList'
import GameView from '../../back/components/GameView'
import * as GameViewActions from '../../back/scripts/actions/gameView'
import * as SceneActions from '../../back/scripts/actions/scene'
import * as ConsoleActions from '../../back/scripts/actions/console'
import * as gameViewLayoutIndexActions from '../../back/scripts/actions/gameViewLayoutIndex'
import * as stageRotation90Actions from '../../back/scripts/actions/stageRotation90'

import SelectResource from '../../back/components/SelectResource'

import RotateButton from '../../back/components/RotateButton'

import EditOperations from '../../back/components/EditOperations/'
import ConsolePanel from '../../back/components/ConsolePanel/'
import SceneTitle from '../../back/components/SceneTitle/'

import FixedBox from '../../back/componentsLayout/FixedBox/'
import FlexBox from '../../back/componentsLayout/FlexBox/'

import {createMyStore} from '../../common/routerBuild'
import getParamsFromUrl from '../../common/getParamFromUrl'
import {editReducers} from '../../back/scripts/reducers/'

import {createRouterList} from './router/'

import autoBind from 'react-autobind'

window.R = React;
window.RD = ReactDOM;

const initSceneTitle = '新建场景名';

let editStore = createMyStore(editReducers,{
  withRouter:true,
  initialState:{
    viewData:[
      {
        name:'初始',
        children:[]
      }
    ],
    sceneTitle:initSceneTitle,
    consoleTab:'material',
    consoleData:[],
    stageRotation90:true,
  }
});

//let routerList = createRouterList(editStore);

class Edit extends React.Component {
  constructor(props){
    super(props)

    autoBind(this)
  }

  componentDidMount(){

    var sceneId = getParamsFromUrl().id;

    if(sceneId){
      this.props.actions.initViewData(sceneId);
    }

    this.props.actions.queryData();
  }

  saveScene(){
    
    this.props.actions.saveViewData();
  }

  output(){
    
    this.props.actions.outputViewData();
  }
  
  render(){
    log('EDIT:',this.props);

    var {viewData,
      sceneId,
      sceneTitle,consoleData,editSceneSprite,
      gameViewLayoutIndex,
      stageRotation90,
      actions} = this.props;

    var disabledOutput = !sceneId;

    return (
      <div>
        <Navbar mode="left" >
          <SceneTitle actions={actions} title={sceneTitle} />

          <EditOperations 
            onSave={this.saveScene}
            onOutput={this.output}
            disabledOutput={disabledOutput}
            />
        </Navbar>

        <div className="resource-tabs">
          <FlexBox childrenWidth={[undefined,100]}>
            <SelectResource spriteResource={consoleData}></SelectResource>

            <div className="top-tools">

              <RotateButton
                onClick={actions.rotateGame}
                rotate={stageRotation90}
                />
              
            </div>

          </FlexBox>
        </div>

        <FixedBox top="127">
          <FlexBox childrenWidth={[120,undefined,600]}>

            <CascadeList
              currentLayoutIndex={gameViewLayoutIndex}
              data={viewData}
              onSelectContainer={actions.layoutIndexChange}
              onChangeContainerName={actions.containerRename}
              onChildRemove={actions.childRemove}
              onAddLayout={actions.containerAdd}
            />

            <GameContainer>
              <GameView
                currentLayoutIndex={gameViewLayoutIndex}
                actions={actions}
                data={viewData}/>
            </GameContainer>

            <ConsolePanel consoleData={editSceneSprite} actions={actions} />
            
          </FlexBox>
        </FixedBox>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    viewData: state.viewData,
    sceneTitle: state.sceneTitle,
    consoleData:state.consoleData,
    editSceneSprite:state.editSceneSprite,
    sceneId:state.sceneId,
    gameViewLayoutIndex:state.gameViewLayoutIndex,
    stageRotation90:state.stageRotation90,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(
      {},
      GameViewActions,
      SceneActions,
      ConsoleActions,
      gameViewLayoutIndexActions,
      stageRotation90Actions
    ),dispatch)
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