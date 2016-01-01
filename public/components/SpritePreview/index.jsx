require('./style');

let React = require('react');

let FileUpload = require('../../componentFunctional/FileUpload');

class SpritePreview extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <div id="spritePreviewBox">
        <h3>预览</h3>

        <div className="container">
          <FileUpload>
            <div className="preview-container">
            </div>
          </FileUpload>

          <div className="properties-setting">

          </div>
        </div>


        <footer className="operation">
          <button>submit</button>
          <button>reset</button>
        </footer>
      </div>
    )
  }
}

module.exports = SpritePreview;