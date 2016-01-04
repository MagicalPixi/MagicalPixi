/**
 * Created by zyg on 15/11/6.
 */
let ReactDOM = require('react-dom');
let React = require('react');

let SpritePreview = require('../components/SpritePreview');
let SpritePreViewF = React.createFactory(SpritePreview);

ReactDOM.render(
  SpritePreViewF({spriteType:SpritePreview.SPRITE_IM}),
  document.querySelector('#topContainer')
)
