/**
 * Created by zyg on 16/1/25.
 */
let getRenderer = require('./getRenderer');

module.exports = function (container) {
  let renderer = getRenderer();

  container.appendChild(renderer.view);

  let stage = new PIXI.Container();

  let raf = null;

  let animate = function () {

    stage.children.forEach((function(child){
      if(child.render){
        child.render();
      }
    }));
    renderer.render(stage);

    raf = requestAnimationFrame(animate);
  };

  animate(stage);

  stage.clearRender = function () {
    cancelAnimationFrame(raf);

    renderer.view.remove();
  };

  return stage;
};