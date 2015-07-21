var gulp = require('gulp');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var sc = require('sc-color');
var firstBy = require('thenby.js');
var templateData = require('./src/crayon.json');
var scProp = function(propName){
  return function(colorA, colorB) {
    return sc(colorA.color)[propName]() - sc(colorB.color)[propName]();
  };
};

templateData.prefix = '';

templateData.colors = Object.keys(templateData.colors)
  .map(function(colorName){
    return {
      name: colorName,
      color: templateData.colors[colorName]
    };
  })
  .sort(
    firstBy(scProp('hue'))
    .thenBy(scProp('saturation'))
    .thenBy(scProp('value'))
  );

gulp.task('default', function() {
  gulp
    .src(['src/*'])
    .pipe(handlebars(templateData))
    .pipe(rename(function (path) {
      path.extname = path.extname.replace('.hbs', '');
    }))
    .pipe(gulp.dest('dist/'));
});
