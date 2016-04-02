/**
 * Created by zyg on 16/2/11.
 */
let PIXI = require('pixi');
var pixiLib = require('pixi-lib');
let {SPRITE_IM,SPRITE_MC,spriteFnMap} = require('./../back/components/SpriteSetting/previewConfig');

let removeByIndex = function (array,index) {
  return array.splice(index,1);
};

module.exports = function containersManager(containers) {

  return {
    getContainers(){
      return containers;
    },
    //翻译成pixiContainers
    getPixiContainers(){

      let pixiContainers = containers.map(function ({name,children}) {
        let container = new PIXI.Container();
        container.name = name;

        return {
          container,
          children
        }
      }).map(function ({container,children}) {

        children.map(function (materialOne) {

          let properties = JSON.parse(materialOne.properties);

          pixiLib.loadSprite(materialOne.resourceUrl,materialOne.type,properties,(spriteDisplayObj)=>{
            container.addChild(spriteDisplayObj);
          });
          //loadResource(materialOne.resourceUrl, function (resource) {
          //  properties.textures = resource.texture || resource.textures;
          //  let spriteDisplayObj = spriteFnMap(materialOne.type)(properties);
          //});
        });

        return container;
      });

      return pixiContainers;
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
        newLayout ={
          children:[]
        };
      }

      containers.splice(index,0,newLayout);

      return this;
    },
    containerTop(index){
      let topContainer = containers.splice(index,1);

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