var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var server = require('./server/server');

gulp.task('browserify', function () {
  gulp.src(['./client/deps.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('copy', function () {
  gulp.src(['./client/src/**'])
    .pipe(gulp.dest('./client/dist'))
})

gulp.task('webserver', function () {
  gulp.src('./client/dist')
    .pipe(webserver({
      open: true
    }));
});


gulp.task('build', ['browserify', 'copy']);

gulp.task('watch', ['build'], function () {
  gulp.watch(['./client/src/**'], [
    'build'
  ]);
});

gulp.task('server', function () {
  server();
})


gulp.task('default', ['webserver', 'server']);
