
module.exports = (req, res, next) => {
  var game = require('../requests').game
  game.create(req.body).then(value => {
    res.json(value.data)
  }).catch(reason => {
    next(new Error('create game faild'))
  })
}
