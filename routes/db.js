var express = require('express')
var router = express.Router()

var checkCookie = (req) => {
  var common = require('mp_common')
  var cookies = req.cookies
  var statics = common.statics
  if (cookies[statics.user_id] && cookies[statics.auth_id] && cookies[statics.auth] && cookies[statics.expire_time]) {
    return common.header.browser(cookies[statics.user_id], cookies[statics.auth_id], cookies[statics.auth], cookies[statics.expire_time])
  } else {
    return null
  }
}

router.get('/:scheme/:name', (req, res, next) => {
  var config = require('../config')
  var common = require('mp_common')
  var header
  if (header = checkCookie(req)) {
    var request = common.request(config.dbserver.domain)(req.params.scheme, req.params.name)
    request.get(req.query, header).then(value => {
      res.json({result: value.data})
    }).catch(reason => {
      console.log(reason)
      next(new Error('db request named: [' + name + '] failed'))
    })
  } else {
    res.json({result: {msg:'auth is not invalid', errCode: 602}})
  }
})

router.post('/:scheme/:name', (req, res, next) => {
  var config = require('../config')
  var common = require('mp_common')
  var header
  if (header = checkCookie(req)) {
    var request = common.request(config.dbserver.domain)(req.params.scheme, req.params.name)
    request.create(req.body, header).then(value => {
      res.json({result: value.data})
    }).catch(reason => {
      console.log(reason)
      next(new Error('db request named: [' + name + '] failed'))
    })
  } else {
    res.json({result: {msg:'auth is not invalid', errCode: 602}})
  }
})

module.exports = router
