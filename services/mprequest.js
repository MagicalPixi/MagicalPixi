
var dbrequest = (scheme, name) => {
  var axios = require('axios')
  var pluralize = require('pluralize')
  var common = require('mp_common')
  var config = require('../config')
  var domin = env.BROWSER_ENV ? '/db' : config.dbserver.domin
  var header
  if (!env.BROWSER_ENV) {
    header = common.header.server(config.common.server_key)
  }
  return {
    get: (query) => {
      var url = domin + '/' + scheme + '/' + name
      return axios.get(url, {params: query, header: header})
    },
    getAll: () => {
      var names = pluralize.plural(name)
      var url = domin + '/' + scheme + '/' + names
      return axios.get(url, {header: header})
    },
    create: (data) => {
      var url = domin + '/' + scheme + '/' + name
      return axios.post(url, data, {header: header})
    }
  }
}

module.exports = {
  dbrequest: dbrequest
}
