/**
 * Created by zyg on 15/11/6.
 */
require('../../styles/main.scss');
require('../../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');

import Navbar from '../../back/components/Navbar/index'

import ContentsBox from '../../back/componentsLayout/ContentsBox/index'

import AsideBoard from '../../back/components/AsideBoard/index'

import routerList from './router/'

window.R = React;
window.RD = ReactDOM;

class Main extends React.Component {

  render(){
    return (
      <div>
        <Navbar />

        <ContentsBox>
          <AsideBoard />
          {routerList}
        </ContentsBox>
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.querySelector('#topContainer')
);


