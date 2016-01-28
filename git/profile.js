/**
 * Created by guoshencheng on 1/28/16.
 */
var nodegit = require('nodegit')
var author = nodegit.Signature.create("Magical Pixi",
  "xianggudunji@yeah.com", 123456789, 60);
var committer = nodegit.Signature.create("Magical Pixi",
  "xianggudunji@yeah.com", 987654321, 90);
module.exports = {
  author: author,
  committer: committer
}