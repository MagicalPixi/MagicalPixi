var fs = require('fs');

function dirExists(dir,cb) {
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
  dirExists
};