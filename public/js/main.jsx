/**
 * Created by zyg on 15/11/6.
 */
require('../styles/main.scss');

let ReactDOM = require('react-dom');
let React = require('react');

let Navbar = require('../componentsLayout/Navbar');

let ContentsBox = require('../componentsLayout/ContentsBox');

let SpritePreview = require('../components/SpritePreview');
let SpritePreViewF = React.createFactory(SpritePreview);

let AsideBoard = require('../componentsLayout/AsideBoard');
let MaterialsList = require('../componentsLayout/MaterialsList');


class Main extends React.Component {
  render(){
    return (
      <div>
        <Navbar></Navbar>

        <ContentsBox>
          <AsideBoard></AsideBoard>
          <MaterialsList></MaterialsList>
        </ContentsBox>
      </div>
    )
  }
}
//<SpritePreview></SpritePreview>



ReactDOM.render(
  React.createElement(Main),
  document.querySelector('#topContainer')
);
