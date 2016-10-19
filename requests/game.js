var axios = require('axios')
var config = require('./config')
module.exports = {
  create: (data, browser) => {
    var url = browser ? config.path.game.normal : config.domin.db + config.path.game.normal
    return axios.post(url, data)
  }
}
