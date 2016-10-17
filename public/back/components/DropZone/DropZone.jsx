require('./DropZone.scss');

import ReactDOM from 'react-dom'
const T = React.PropTypes;
import autoBind from 'react-autobind'
  multiple: false
};

const supportMultiple = (typeof document !== 'undefined' && document && document.createElement) ? 'multiple' in document.createElement('input') : true
 constructor(props){
   super(props);
     this.state = {
      isReject: false,
   autoBind(this);
 }

 onDrop(event) {
   var files = event.dataTransfer ? event.dataTransfer.files : event.target.files
   if (!this.props.multiple && files.length > 1) {
     this.setReject(true)
     return;
   } else {
     this.setReject(false)
     if (this.props.onDrop) {
       this.props.onDrop(files, this)
     }
   }
 }

 setReject(isreject) {
   this.setState({
     isReject: isreject
   })
 }

 setLoading(isloading) {
   this.setState({
     isLoading: isloading
   })
 }

 getText() {
   return this.state.isLoading ? loadingText : this.state.isReject ? rejectText : uploadText
 }

 render() {
   let inputAttributes = {
     style: {display: this.state.isLoading ? 'none' : 'block'},
     type: 'file',
     multiple: supportMultiple,
     ref: el => this.fileInputEl = el,
     onChange: this.onDrop
   }
   let maskStyle = {
     display: this.state.isLoading ? 'block' : 'none'
   }

   let textStyle = {
     color: this.state.isLoading ? 'white' : this.state.isReject ? '#d63c3c' : '#7b7b7b'
   }

   return (
     <div className="dropZone">
       <input className="file_input"
         {...inputAttributes}
      />
      <div className="mask" style={maskStyle}></div>
      <p className="content_text" style={textStyle}>{this.getText()}</p>
     </div>
   )
 }
}
DropZone.defaultProps = defaultProps;
module.exports = DropZone;