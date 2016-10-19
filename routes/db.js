var express = require('express')
var router = express.Router()
var requests = require('../services/requests')

Object.keys(requests).map(key => {
  return requests[key]
}).forEach(model => {
  var pluralize = require('pluralize')
  var name = model.name
  var names = pluralize.plural(name)
  router.get('/' + names, (req, res, next) => {
    model.getAll().then(value => {
      res.json({result: value.data})
    }).catch(reason => {
      console.log(reason)
      next(new Error('db request named: [' + name + '] failed'))
    })
  })
  router.get('/' + name, (req, res, next) => {
    model.get(req.query).then(value => {
      res.json({result: value.data})
    }).catch(reason => {
      console.log(reason)
      next(new Error('db request named: [' + name + '] failed'))
    })
  })
  router.post('/' + name, (req, res, next) => {
    model.create(req.body).then(value => {
      res.json({result: value.data})
    }).catch(reason => {
      console.log(reason)
      next(new Error('db request named: [' + name + '] failed'))
    })
  })
})

module.exports = router
