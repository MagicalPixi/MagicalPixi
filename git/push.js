/**
 * Created by guoshencheng on 1/29/16.
 */
//git@github.com:MagicalPixi/test.git
var nodegit = require('nodegit')
var path = require('path')
var repository, remote
var push = function(remoteKey, remoteUrl) {
  nodegit.Repository.open(path.resolve(__dirname, "./test/.git")).then(function (repoResult) {
    repository = repoResult
    console.log(repoResult)
    return nodegit.Remote.lookup(repository, remoteKey)
  }).then(function(remoteResult) {
    remote = remoteResult
    return remote.push(["refs/heads/master:refs/heads/master"], {
      callbacks: {
        credentials: function(url, userName) {
          return nodegit.Cred.sshKeyFromAgent(userName);
        }
      }
    })
  }).done(function() {
    console.log('done !');
  })
}
//push('origin', 'git@github.com:MagicalPixi/test.git')

module.exports = push;