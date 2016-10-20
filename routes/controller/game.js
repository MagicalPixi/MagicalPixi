/**
 * Created by zyg on 15/11/6.
 */
var env = process.env.NODE_ENV;
var webpackDevPort = require('../../webpack.config').webpackDevPort;
var auth = require('../../services/middleware').auth({
  authServer: 'http://localhost:8999'
})
module.exports = {
  create: [auth, function(req, res){
    res.render('game',{
      env:env,
      webpackDevPort:webpackDevPort,
      name: 'game_create'
    });
  }],
};
