/**
 * Created by zyg on 16/1/28.
 */
let {bindNext} = require('re-pubsub');
let store = require('./dataStore');

let topic = 'gameViewMaterials';

let publish = bindNext([

],store);

module.exports = function (data) {
  return publish(topic,data)
};