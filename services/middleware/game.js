var mprequest = require('../mprequest')
var game = {}
game.getOne = (req, res, next) => {
  var request = mprequest.dbrequest('api', 'game')
  request.get({id: req.params.id}).then(value => {
    if (value.data && value.data.errCode != 602) {
      req.custom.game = value.data
    }
    next()
  }).catch(reason => {
    next(reason)
  })
}

module.exports = game
