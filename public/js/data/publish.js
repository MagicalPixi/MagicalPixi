/**
 * Created by zyg on 16/1/26.
 */
let PubSub = require('pubsub-js');

module.exports = function (topic, data) {


  PubSub.publish(topic,data);

};