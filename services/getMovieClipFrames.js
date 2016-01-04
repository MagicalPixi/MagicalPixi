/**
 * Created by zyg on 16/1/4.
 */
var fs = require('fs');

module.exports = function(jsonFilePath){

  var json = fs.readFileSync(jsonFilePath,{
    encoding:'utf8'
  });

  var frames = [];
  try{
    var framesObj = JSON.parse(json).frames;

    for(var k in framesObj){
      frames.push(k);
    }
  }catch(e){
    console.log('getMovieClipFrames:',e);
  }

  return frames;
};