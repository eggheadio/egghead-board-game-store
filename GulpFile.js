var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var connect = require('gulp-connect');


var open = require('open');

gulp.task('cssify', function () {
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css', { read: false })
        .pipe(browserify({
            transform: ['cssify'],
            extensions: ['.css']
        }))
        .pipe(concat('styles.js'))
        .pipe(gulp.dest('./client/dist/css'))
});

gulp.task('browserify', function () {
    gulp.src(['./client/src/index.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./client/dist'));
});

gulp.task('connect', function () {
    connect.server({
        root: './client/dist',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./client/dist/index.html')
        .pipe(connect.reload());
});

gulp.task('watch', [], function () {
    gulp.watch(['client/src/**'], [
        'copyHtml',
        'cssify',
        'browserify',
        'html'
    ]);
});

gulp.task('server', function () {
    require('./server/server');
})

gulp.task('copyHtml', function () {
    gulp.src('./client/src/**/*.html')
        .pipe(gulp.dest('./client/dist'));
});


gulp.task('default', ['copyHtml', 'cssify', 'browserify', 'connect', 'server'], function () {
    open("http://localhost:8080")
})