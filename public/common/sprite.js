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
        for(var texture of textures){
            texturesArr.push(texture);
        }

        var mc = new PIXI.extras.MovieClip(texturesArr);
        return setConfig(mc,config);
    },
    getIm:function(config){
        var textures = config.textures;

        delete config.textures;

        var sp = new PIXI.Sprite(textures);

        return setConfig(sp,config);
    }
};