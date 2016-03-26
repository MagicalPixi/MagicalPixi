'use strict'

var Player = require('../models/Player');

module.exports = function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var childSprites = req.body.childSprites;

  console.log(childSprites);

  Player.save({
    id,
    name,
    childSprites
  }).then(function (result) {

    res.json({
      result:result.ops[0]._id
    });
  }).catch(function (err) {
    console.log('err:',err);

    res.json({
      err
    })
  });
};