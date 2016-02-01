/**
 * Created by zyg on 15/11/7.
 */
let setConfig = require('./setConfig');

module.exports = {
    setConfig,
    getMc:function(config){
        var textures = config.textures;
        delete config.textures;

        var texturesArr = [];
        for(var key in textures){
            texturesArr.push(textures[key]);
        }

        var mc = new PIXI.extras.MovieClip(texturesArr);
        //var mc = new PIXI.extras.MovieClip(textures);
        return setConfig(mc,config);
    },
    getIm:function(config){        var textures = config.textures;

        delete config.textures;

        var sp = new PIXI.Sprite(textures);

        return setConfig(sp,config);

    }
};