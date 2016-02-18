/**
 * Created by zyg on 15/11/6.
 */
require('../styles/main.scss');
require('../common/utils');

let ReactDOM = require('react-dom');
let React = require('react');

let Navbar = require('../components/Navbar');

let ContentsBox = require('../componentsLayout/ContentsBox');

let AsideBoard = require('../components/AsideBoard');

let routerList = require('./router');

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


