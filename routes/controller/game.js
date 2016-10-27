/**
 * Created by zyg on 15/11/6.
 */
var env = process.env.NODE_ENV;
var webpackDevPort = require('../../webpack.config').webpackDevPort;
var config = require('../../config')
var middleware = require('../../services/middleware')
var statics = require('mp_common').statics
module.exports = {
  [':id']: [middleware.game.getOne, function(req, res) {
    var game = req.custom.game

  }],
  create: function(req, res){
    res.render('game/create',{
      env:env,
      webpackDevPort:webpackDevPort,
      edit: false,
    });
  },
  ['create/:id']: [middleware.game.getOne, function(req, res) {
    var game = req.custom.game
    game.owner = {id: game.owner.id, username: game.owner.username}
    res.render('game/create',{
      env:env,
      webpackDevPort:webpackDevPort,
      edit: true,
      game: game
    });
  }],
  my: function(req, res){
    res.render('game/my',{
      env:env,
      webpackDevPort:webpackDevPort,
    });
  },
};
