
var upload = (name, value, content = false) => {
  var axios = require('axios')
  var common = require('mp_common')
  var config = require('../config')
  var header
  if (!env.BROWSER_ENV) {
    header = common.header.server(config.common.server_key)
  }
  var path = content ? '/upload/content' : '/upload'
  var url = config.dbserver.domain + path
  var data
  if (content) {
    data = {
      content: value
    }
  } else {
    data = new FormData()
    data.append('file', value)
  }
  return axios.post(url, data, {headers: header, params: {name: name}})
}


var dbrequest = (scheme, name) => {
  var axios = require('axios')
  var pluralize = require('pluralize')
  var common = require('mp_common')
  var config = require('../config')
  var domain = env.BROWSER_ENV ? '/db' : config.dbserver.domain
  var header
  if (!env.BROWSER_ENV) {
    header = common.header.server(config.common.server_key)
  }
  return {
    get: (query) => {
      var url = domain + '/' + scheme + '/' + name
      return axios.get(url, {params: query, header: header})
    },
    getAll: () => {
      var names = pluralize.plural(name)
      var url = domain + '/' + scheme + '/' + names
      return axios.get(url, {header: header})
    },
    create: (data) => {
      var url = domain + '/' + scheme + '/' + name
      return axios.post(url, data, {header: header})
    }
  }
}

module.exports = {
  dbrequest: dbrequest,
  upload, upload
}
