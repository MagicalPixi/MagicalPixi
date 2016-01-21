/**
 * Created by zyg on 15/11/6.
 */
var env = process.env.NODE_ENV;
var webpackDevPort = require('../../webpack.config').webpackDevPort;


module.exports = {
  index:function(req,res){
    res.render('index',{
      env:env,
      webpackDevPort:webpackDevPort
    });
  },
  edit:function(req,res){
    res.render('edit',{
      env:env,
      webpackDevPort:webpackDevPort
    });
  }
};