/**
 * Created by zyg on 15/11/10.
 */
var path = require('path');
var qnUpload = require('gulp-qiniu');

var src = path.resolve(__dirname,'../public/images/howToShare.png');

var optionDir = path.resolve(__dirname,'../uploadDir/');

module.exports = function(gulp){
  gulp.task('qiniu',function(){
    gulp.src(src).pipe(qnUpload({
      accessKey: "OoRT_gLqGqgXXZ1aR3L1iDIjvEYGRfWX86iqU14w",
      secretKey: "TSNUtEGcL50mGAuVtO9C9FBijB3R3djy6pX2_Dzz",
      bucket: "test",
      private: false
    },{
      dir:optionDir,
      versioning: true,
      versionFile: './cdn.json'
    }))
  });
};