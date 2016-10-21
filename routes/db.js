var express = require('express')
var router = express.Router()
var requests = require('../services/requests')

var broseHeader = (req) => {
  var authId = req.cookies['magicalpixi-authId']
  var auth = req.cookies.auth
  var expire_time = req.cookies.expire_time
  return {
    authId, auth, expire_time
  }
}

Object.keys(requests).map(key => {
  return requests[key]
}).forEach(model => {
  var pluralize = require('pluralize')
  var name = model.name
  var names = pluralize.plural(name)
  router.get('/' + names, (req, res, next) => {
    console.log(broseHeader(req))
    model.getAll(broseHeader(req)).then(value => {
      res.json({result: value.data})
    }).catch(reason => {
      console.log(reason)
      next(new Error('db request named: [' + name + '] failed'))
    })
  })
  router.get('/' + name, (req, res, next) => {
    model.get(req.query, broseHeader(req)).then(value => {
      res.json({result: value.data})
    }).catch(reason => {
      console.log(reason)
      next(new Error('db request named: [' + name + '] failed'))
    })
  })
  router.post('/' + name, (req, res, next) => {
    var header = broseHeader(req)
    model.create(req.body, broseHeader(req)).then(value => {
      res.json({result: value.data})
    }).catch(reason => {
      console.log(reason)
      next(new Error('db request named: [' + name + '] failed'))
    })
  })
})

module.exports = router
