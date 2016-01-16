/**
 * Created by zyg on 16/1/16.
 */

var Sprite = require('../models/Sprite');

module.exports = function (req, res) {

  Sprite.fineAll().then(function (result) {

    res.json({result});

  }).catch(function (err) {
    res.json({
      err
    })
  });
};