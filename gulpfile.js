var gulp = require('gulp');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');

var templateData = require('./src/crayon.json');

templateData.prefix = 'color-';

gulp.task('default', function() {
  gulp
    .src(['src/*'])
    .pipe(handlebars(templateData))
    .pipe(rename(function (path) {
      path.extname = path.extname.replace('.hbs', '');
    }))
    .pipe(gulp.dest('dist/'));
});
