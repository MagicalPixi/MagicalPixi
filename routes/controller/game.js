/**
 * Created by zyg on 15/11/6.
 */
var env = process.env.NODE_ENV;
var webpackDevPort = require('../../webpack.config').webpackDevPort;

module.exports = {
  create: function(req, res){
    res.render('game',{
      env:env,
      webpackDevPort:webpackDevPort,
      name: 'game_create'
    });
  },
};
