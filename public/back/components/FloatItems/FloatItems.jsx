require('./FloatItems.scss')
let React = require('react');
let T = React.PropTypes;
let ReactDOM = require('react-dom');
let _ = require('lodash');

class FloatItems extends React.Component {


  dragStart(materialOne,e){
    log('materialOne:',materialOne);

    let dt = e.nativeEvent.dataTransfer;

    dt.setData(
      'text/plain',
      JSON.stringify(materialOne)
    );
  }

  render(){
    let {title,data} = this.props;

    return (
      <section id="floatItems">
        <header>
          <h4>{title}</h4>
        </header>
        <ul className="items">
        {data.map((itemOne,i)=>{
          let {name,thumbnail} = itemOne;

          let k = `fi-${i}`;

          return (
            <li key={k} draggable="true" className={k}
              onDragStart={this.dragStart.bind(this,itemOne) } >
              <div className="box">
                <img draggable="false" className="thumbnail"
                  src={thumbnail} />
              </div>
              <p className="name" >{name}</p>
            </li>
          )
        })}
        </ul>
      </section>
    )
  }
}

FloatItems.propTypes = {
  title:T.string.isRequired,
  data:T.array.isRequired
};

module.exports = FloatItems;