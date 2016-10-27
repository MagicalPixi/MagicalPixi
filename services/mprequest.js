
var axios = require('axios')
var common = require('mp_common')
var config = require('../config')
var pluralize = require('pluralize')

var upload = (name, value, content) => {
  var header
  if (!env.BROWSER_ENV) {
    header = common.header.server(config.common.server_key)
  } else {
    var Cookie = require('js-cookie')
    var statics = common.statics
    header = common.header.browser(Cookie.get(statics.user_id), Cookie.get(statics.auth_id), Cookie.get(statics.auth), Cookie.get(statics.expire_time))
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
  var domain = env.BROWSER_ENV ? '/db' : config.dbserver.domain
  var header
  if (!env.BROWSER_ENV) {
    header = common.header.server(config.common.server_key)
  }
  return {
    get: (query) => {
      var url = domain + '/' + scheme + '/' + name
      return axios.get(url, {params: query, headers: header})
    },
    getAll: () => {
      var names = pluralize.plural(name)
      var url = domain + '/' + scheme + '/' + names
      return axios.get(url, {headers: header})
    },
    create: (data) => {
      var url = domain + '/' + scheme + '/' + name
      return axios.post(url, data, {headers: header})
    }
  }
}

module.exports = {
  dbrequest: dbrequest,
  upload, upload
}
