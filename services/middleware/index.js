var path = require('path')
var fs = require('fs')

var middleware = {}
var dir = path.resolve(__dirname, './')
var jsFileRegExp = /\.js$/
var files = fs.readdirSync(dir)
var models = files.filter(file => {
  return jsFileRegExp.test(file) && file != 'index.js'
}).map(file => {
  return file.replace(jsFileRegExp, '')
}).forEach(model => {
  var currentmodel = require('./' + model)
  middleware[model] = currentmodel
})

module.exports = middleware
