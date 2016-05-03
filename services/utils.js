var fs = require('fs');

function mkdirIfNotExists(dir,cb) {
  fs.exists(dir, function (exists) {
    if(!exists){
      fs.mkdir(dir, function () {
        cb && cb();
      });
    }
    cb && cb();
  });
};

module.exports = {
  mkdirIfNotExists
};