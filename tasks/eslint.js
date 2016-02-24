var eslint = require('gulp-eslint');

module.exports = function (gulp) {


  gulp.task('eslint', function () {
    return gulp.src([
      '**/*.js',
      '**/*.jsx',
      '!re.js',
      '!node_modules/**',
      '!public/bower_components/**',
      '!public/dist/**',
      '!public/download/**',
      '!public/materials/**'
    ]).pipe(eslint())
    .pipe(eslint.format());
  });
};