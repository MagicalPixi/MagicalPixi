/**
 * Created by zyg on 16/1/12.
 *
 * 验证登录的session，flag
 */


module.exports = function (req,res,next) {
  var err = undefined;

  if(!req.session.userToken){
    err = new Error('need userFlag');
  }

  next(err);
};