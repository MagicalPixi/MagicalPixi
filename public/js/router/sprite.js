/**
 * Created by zyg on 16/1/20.
 */
let React = require('react');


let SpritePreview = require('../../components/SpritePreview');
let SpritePreViewF = React.createFactory(SpritePreview);

let MaterialsList = require('../../componentsLayout/MaterialsList');


let API = require('../API');


class Sprite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      materialsList:[]
    }
  }

  componentDidMount(){

    ajax(API.materialsList).get().then((r)=>{

      log('r:',r);

      this.setState({
        materialsList: r.result
      })
    })
  }

  render(){
    let {materialsList} = this.state;

    return (
      <div>
        <MaterialsList data={materialsList} />
      </div>
    )
  }
}

module.exports = Sprite;