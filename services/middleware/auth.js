var config = require('../../config/')
var common = require('mp_common')

var generateAuthParam = (cookies) => {
  var statics = common.statics
  var params = {}
  if (cookies[statics.auth_id]) cookies[statics.auth_id]= cookies[statics.auth_id]
  if (cookies[statics.user_id]) cookies[statics.user_id] = cookies[statics.user_id]
  if (cookies[statics.auth]) cookies[statics.auth] = cookies[statics.auth]
  if (cookies[statics.expire_time]) cookies[statics.expire_time] = cookies[statics.expire_time]
  return params
}

var handleCookies = (req, res) => {
  var statics = common.statics
  var cookies = Object.assign(req.cookies, req.query)
  if (common.auth.check(cookies)) {
    res.cookie(statics.auth_id, cookies[statics.auth_id])
    res.cookie(statics.user_id, cookies[statics.user_id])
    res.cookie(statics.auth, cookies[statics.auth])
    res.cookie(statics.expire_time, cookies[statics.expire_time])
    return true
  } else {
    return false
  }
}

module.exports = (config) => {
  return (req, res, next) => {
    if (handleCookies(req, res)) {
      next()
    } else {
      var cookies = Object.assign(req.cookies, req.query)
      var params = generateAuthParam(cookies)
      params.redirectTo = encodeURIComponent(config.backserver.local + req.originalUrl)
      var url = common.StringUtil.addQuery(config.loginserver.domain, params)
      res.redirect(url)
    }
  }
}
