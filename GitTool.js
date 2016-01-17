var nodegit = require('nodegit')
var path = require('path')
var promisify = require('promisify-node')
var fse = promisify(require('fs-extra'))
fse.ensureDir = promisify(fse.ensureDir)

var repo
var index
var oid

nodegit.Repository.open(path.resolve(__dirname, '../ImageRepository/.git'))
.then(function(repoResult) {
  repo = repoResult
  return repo.openIndex()
})
.then(function (indexResult) {
  index = indexResult
  return index.read(1)
})
.then(function () {
    return index.addAll();
})
.then(function() {
  return index.write()
})
.then(function() {
  return index.writeTree()
})
.then(function(oidResult) {
  oid = oidResult
  return nodegit.Reference.nameToId(repo, 'HEAD')
})
.then(function(head) {
  return repo.getCommit(head)
})
.then(function(parent) {
    var author = nodegit.Signature.now("guoshencheng",
      "648772021@qq.com");
    var committer = nodegit.Signature.now("guoshencheng",
      "648772021@qq.com");
    return repo.createCommit("HEAD", author, committer, "add picture", oid, [parent])
})
.done(function(commitId) {
  console.log("New Commit: ", commitId);
});
