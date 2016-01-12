/**
 * Created by zyg on 16/1/11.
 */
var Sprite = require('../models/Sprite');

module.exports = function (req, res) {

  console.log(req.body);

  var type = req.body.spriteType;
  var name = req.body.spriteName;
  var properties = req.body.properties;

  var userFlag = req.session.userFlag;

  Sprite.save({
    userFlag,
    type,
    name,
    properties
  }).then(function(result){
    console.log(result);

    res.json({result});

  }).catch(function (err) {
    res.json({err})
  });
};