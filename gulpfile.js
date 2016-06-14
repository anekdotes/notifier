// =======================================================================================
// Necessary stuff
// =======================================================================================
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var replace = require('gulp-regex-replace');
var rev = require('gulp-rev');
// =======================================================================================
// =======================================================================================

// =======================================================================================
// Tasks
// =======================================================================================
//default task => gulp
gulp.task('default', [
  'css',
  'js',
  'mjs'
]);

//watch task => gulp watch
gulp.task('watch', function() {
  gulp.watch([
    './src/*.scss',
    './src/*.css'
  ], ['css']);
  gulp.watch([
    './src/*.js'
  ], ['js']);
});

gulp.task('css', function() {
  return gulp.src([
    'src/notifier.scss'
  ])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('notifier.css'))
  .pipe(minifyCSS({
    keepBreaks:true
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css/'));
});

gulp.task('js', function() {
  return gulp.src([
    'src/notifier.js'
  ])
  .pipe(plumber())
  .pipe(concat('notifier.js'))
  .pipe(gulp.dest('./build/js/'));
});

gulp.task('mjs', function() {
  return gulp.src([
    'src/notifier.js'
  ])
  .pipe(plumber())
  .pipe(concat('notifier.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js/'));
});
// =======================================================================================
// =======================================================================================
