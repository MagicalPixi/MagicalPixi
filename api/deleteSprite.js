/**
 * Created by zyg on 16/1/17.
 */
var Sprite = require('../models/Sprite');

module.exports = function (req, res) {

  var id = req.query.id;


  Sprite.deleteOne({
    id
  }).then(function (result) {
    res.json({
      result:`delete ${id} ${!!result}`
    })
  }).catch(function (err) {
    console.log('delete err:',err);
    res.json({
      err
    })
  })
};