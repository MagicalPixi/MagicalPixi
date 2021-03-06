var jsFileRegExp = /\.js$/
var files = ['game.js']
var Request = require('./baseRequest')
var requests = {}

files.filter(file => {
  return jsFileRegExp.test(file) && file != 'index.js'
}).map(file => {
  return file.replace(jsFileRegExp, '')
}).forEach(model => {
  var currentmodel = require('./' + model)
  currentmodel.name = currentmodel.name || model

  console.log(currentmodel);

  var request = Request(currentmodel)
  requests[model] = request
});

module.exports = requests;