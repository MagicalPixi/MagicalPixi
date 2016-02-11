/**
 * Created by zyg on 16/2/11.
 */
let PIXI = require('pixi');

let removeByIndex = function (array,index) {
  return array.splice(index,1);
};

module.exports = function containersManager(containers) {

  return {
    getContainers(){
      return containers;
    },
    containerDel(index){
      if(containers[index] !== undefined){
        containers.splice(index,1);
      }
      return this;
    },
    containerAdd(newLayout,index){
      if(!index){
        index = containers.length;
      }
      if(!newLayout){
        newLayout = new PIXI.Container();
      }

      containers.splice(index,0,newLayout);

      return this;
    },
    containerTop(index){
      var topContainer = containers.splice(index,1);

      containers = topContainer.concat(containers);

      return this;
    },

    childTop(containerIndex,childIndex){
      let container = containers[containerIndex];

      let child = container.children.splice(childIndex,1);

      container.children = child.concat(container.children);

      return this;
    },
  }
};