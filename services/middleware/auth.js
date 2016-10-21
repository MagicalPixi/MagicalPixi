var encode = require('../utils').encode
const KEY = 'magicalpixi-authId'
const PROTOCOL = 'http'

var defaultConfig = (config) => {
  var defautls = {
    authServer: '',
    cookieExpires: 2 * 3600 * 1000
  }
  var final = Object.assign({}, defautls, config);
  if (!final.authServer) {
    throw 'no auth server'
  }
  return final;
}

var addQuery = (url, params) => {
  if (!/\?/.test(url)) {
    url += '?'
  }
  var paramStr = Object.keys(params).map((k)=> {
    return `${k}=${params[k]}`;
  }).join('&');
  return url + encodeURI(paramStr)
}

var handleCookies = (req, res) => {
  var authId = req.query.authId || req.cookies[KEY]
  var auth = req.query.auth || req.cookies.auth
  var expire_time = req.query.expire_time || req.cookies.expire_time
  var current = new Date().getTime()
  console.log(encode(authId + expire_time), auth)
  if (encode(authId + expire_time) == auth && expire_time > current) {
    res.cookie(KEY, authId)
    res.cookie('auth', auth)
    res.cookie('expire_time', expire_time)
    return true
  } else {
    return false
  }
}

module.exports = (config) => {
  config = defaultConfig(config)
  return (req, res, next) => {
    if (handleCookies(req, res)) {
      next()
    } else {
      var cookie = req.cookies
      var params = {}
      if (cookie[KEY]) params.authId = cookie[KEY]
      if (cookie.auth) params.auth = cookie.auth
      if (cookie.expire_time) params.expire_time = cookies.expire_time
      params.redirectTo = encodeURIComponent('http://localhost:2333' + req.originalUrl)
      // params.redirectTo = encodeURIComponent(`${PROTOCOL}://${req.hostname}${req.originalUrl}`)
      var url = addQuery(config.authServer, params)
      res.redirect(url)
    }
  }
}
