/**
 * Created by zyg on 15/11/6.
 */
require('../styles/main.scss');
require('../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');

let Navbar = require('../componentsLayout/Navbar');

let ContentsBox = require('../componentsLayout/ContentsBox');

let AsideBoard = require('../componentsLayout/AsideBoard');

let routerList = require('./router');

class Main extends React.Component {

  render(){
    return (
      <div>
        <Navbar></Navbar>

        <ContentsBox>
          <AsideBoard />
          {routerList}
        </ContentsBox>
      </div>
    )
  }
}

ReactDOM.render(
  React.createElement(Main),
  document.querySelector('#topContainer')
);
