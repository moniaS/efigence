var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var sass = require('gulp-sass');

var $    = require('gulp-load-plugins')();

var options = {
    remoteUrl: "https://github.com/moniaS/efigence.git",
    branch: "gh-pages"};
var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages(options));
});

// gulp.task('sass', function() {
//   return gulp.src('scss/app.scss')
//     .pipe($.sass({
//       includePaths: sassPaths,
//       outputStyle: 'compressed' // if css compressed **file size**
//     })
//       .on('error', $.sass.logError))
//     .pipe($.autoprefixer({
//       browsers: ['last 2 versions', 'ie >= 9']
//     }))
//     .pipe(gulp.dest('css'));
// });
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});
gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
