import React from 'react'
import SpritePreview from '../components/SpritePreview'
import Popup from '../components/Popup'

var SpritePreviewFn = React.createFactory(SpritePreview);

module.exports = (props) => {

  return Popup(SpritePreviewFn(props));
};