/**
 * Created by zyg on 16/1/13.
 */
var path = require('path');

var Sprite = require('../models/Sprite');

var spriteScriptsTemplate = require('../services/spriteScriptsTemplate');

var archiverZip = require('../services/archiverDownloadZip');

var resourceObjBuild = function (resourceUrl) {
  var resourceArr = [resourceUrl];

  if(resourceUrl.indexOf('.json') !== -1){
    var p = path.parse(resourceUrl);
    var name = p.name;
    var dir = p.name;
    resourceArr.push(
      path.resolve(dir,name + '.png')
    );
  }

  return resourceArr.map(function (url) {
    return [
      path.parse(url).base,
      path.join(__dirname,'../public',url)
    ]
  }).reduce(function (init, next) {
    init[next[0]] = next[1];
    return init;
  },{})
};

//GET0
module.exports = function (req, res) {
  var name = req.query.name;

  console.log('name',name);

  Sprite.findOne({name}).then(function (result) {

    if(result){
      var properties = JSON.parse(result.properties);

      var scripts = spriteScriptsTemplate(
        result.type,
        properties
      );

      var resourceObj = resourceObjBuild(result.resourceUrl);

      resourceObj = Object.assign(resourceObj,{
        [name+'.js']:new Buffer(scripts),
      });

      archiverZip('d1.zip',resourceObj)
        .then(function (zipPath) {
          console.log('zipPath:',zipPath);

          res.download(
            zipPath,
            name+'.zip'
          );
      }).catch(function (err) {
        console.log('archiver error:',err);
      });
    }
  });
};