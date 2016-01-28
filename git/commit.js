/**
 * Created by guoshencheng on 1/28/16.
 */
var nodegit = require('nodegit')
var path = require('path')
var profile = require('./profile')
var commit = function(dir) {
  dir = dir || './'
  var repo, index, oid
  nodegit.Repository.open(path.resolve(__dirname, "./test/.git"))
    .then(function (repoResult) {
      repo = repoResult;
      return repo.openIndex();
    })
    .then(function (indexResult) {
      index = indexResult;
      return index.read(1);
    })
    .then(function () {
      // this file is in the root of the directory and doesn't need a full path
      return index.addByPath(dir);
    }).then(function () {
      // this will write both files to the index
      return index.write();
    })
    .then(function () {
      return index.writeTree();
    }).then(function (oidResult) {
      oid = oidResult;
      return nodegit.Reference.nameToId(repo, "HEAD");
    }).then(function (head) {
      return repo.getCommit(head);
    }).then(function (parent) {
      var date = new Date()
      return repo.createCommit("HEAD", profile.author, profile.committer,'Updated at ' + date, oid, [parent]);
    })
    .done(function (commitId) {
      console.log("New Commit: ", commitId);
    });
}
module.expors = commit
