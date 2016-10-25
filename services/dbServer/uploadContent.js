/**
 * Created by zyg on 16/10/19.
 */

var dbServerConnect = require('./dbServerConnect');

var url

module.exports = dbServerConnect(
  'post',
  'upload/content'
);