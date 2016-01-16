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


let API = require('./API');

class Main extends React.Component {

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
        <Navbar></Navbar>

        <ContentsBox>
          <AsideBoard />
          <MaterialsList data={materialsList} />
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
