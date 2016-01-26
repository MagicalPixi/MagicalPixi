/**
 * Created by zyg on 16/1/26.
 */
let PubSub = require('pubsub-js');

module.exports = function subscribe(topic,cb) {

  let i = PubSub.subscribe(topic,cb);

  return function clear() {

    PubSub.unsubscribe(i);
  }
};