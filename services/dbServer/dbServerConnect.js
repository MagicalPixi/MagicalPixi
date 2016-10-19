/**
 * Created by zyg on 16/10/19.
 */
var axios = require('axios');
var qs = require('query-string');
var url = require('URL');

var dbServer = {
  protocol:'http',
  host:'localhost:6770',
};

function buildUrl(pre, path) {
 
  return Object.assign({},pre,{
    pathname:path,
  });
}


module.exports = function (method,path) {

  method = method.toLowerCase();

  return function (data,queryData) {
    if(!data){
      data = {};
    }

    var urlConfig = buildUrl(dbServer,path);
    var args

    if(method === 'get'){

      urlConfig.search = qs.stringify(Object.assign({},data,queryData));

      args = [
        url.format(urlConfig),
        {
          json:true,
        }
      ];
    }else if(method === 'post'){
      urlConfig.search = qs.stringify(Object.assign({},queryData));

      args = [
        url.format(urlConfig),
        data
      ]
    }

    if(!args){
      throw new Error('dbServerConnect:method');
    }

    return axios[method].apply(axios,args);
  }
};



