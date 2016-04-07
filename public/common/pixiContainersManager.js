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

  var clickOnSprite = _=>_;

  return {
    getContainers(){
      return containers;
    },
    //翻译成pixiContainers
    getPixiContainers(){

      let pixiContainers = containers.map(({name,children}) => {
        let container = new PIXI.Container();
        container.name = name;

        return {
          container,
          children
        }
      }).map(({container,children},containerIndex)=>{

        children.map((materialOne,spriteIndex)=>{

          let properties = JSON.parse(materialOne.properties);

          pixiLib.loadSprite(materialOne.resourceUrl,materialOne.type,properties,(spriteDisplayObj)=>{
            container.addChild(spriteDisplayObj);

            spriteDisplayObj.interactive = true;
            spriteDisplayObj.on('mousedown',(e)=>{

              console.log('mousedown',e);

              clickOnSprite(materialOne,containerIndex,spriteIndex);
            });
          });
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

    childTop(containerIndex,childIndex){
      let container = containers[containerIndex];

      let child = container.children.splice(childIndex,1);

      container.children = child.concat(container.children);

      return this;
    },
    onClick(cb){
      clickOnSprite = cb;
    }
  }
};