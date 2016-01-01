/**
 * Created by zyg on 15/11/6.
 */
let ReactDOM = require('react-dom');
let React = require('react');

let SpritePreView = React.createFactory(require('../components/SpritePreview'));


ReactDOM.render(
  SpritePreView(),
  document.querySelector('#topContainer')
)
