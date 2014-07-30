var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var connect = require('gulp-connect');

var server = require('./server/server');
var open = require('open');

gulp.task('browserify', function() {
    gulp.src(['./client/src/app.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./client/dist'));
});

gulp.task('connect', function() {
    connect.server({
        root: './client/dist',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./client/dist/index.html')
        .pipe(connect.reload());
});

gulp.task('watch', [], function() {
    gulp.watch(['client/src/app.js'],[
        'browserify',
        'html'
    ]);
});

gulp.task('server', function () {
    server();
})

gulp.task('copyHtml', function(){
    gulp.src('./client/src/**/*.html')
        .pipe(gulp.dest('./client/dist'));
});


gulp.task('default', ['copyHtml','browserify','connect', 'server'], function () {
    open("http://localhost:8080")
})