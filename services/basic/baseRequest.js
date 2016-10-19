var axios = require('axios')
var pluralize = require('pluralize')
module.exports = (option) => {
  var db = env.BROWSER_ENV ? '' : 'http://db.magicalpixi.com'
  var request = {}
  var name = option.name
  request.name = option.name
  var names = pluralize.plural(name)
  request.create = (data) => {
    var scheme = env.BROWSER_ENV ? 'db' : option.scheme
    var url = db + '/' + scheme + '/' + name
    return axios.post(url, data)
  }
  request.get = query => {
    var scheme = env.BROWSER_ENV ? 'db' : option.scheme
    var url = db + '/' + scheme + '/' + name
    return axios.get(url, {params: query})
  }

  request.getAll = () => {
    var scheme = env.BROWSER_ENV ? 'db' : option.scheme
    var url = db + '/' + scheme + '/' + names
    console.log(url)
    return axios.get(url)
  }
  return request
}
