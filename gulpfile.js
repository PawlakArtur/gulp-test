var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var ts = require('gulp-typescript');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

// configuration
var paths = {
    html: 'build/index.html',
    css: 'build/styles/*.css',
    scriptsTS: 'build/scripts/*.ts'
};

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('clean', function() {
    return del(['app'])
});

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return gulp.src(paths.css)
        .pipe(autoprefixer())
        .pipe(concatCss('style.css'))
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.stream());
});

gulp.task('ts', function () {
    return gulp.src(paths.scriptsTS)
        .pipe(ts({
            noImplicitAny: true,
            out: 'script.js'
        }))
        .pipe(gulp.dest('app/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('build', function(callback) {
    runSequence('clean', ['html', 'styles', 'ts', 'browser-sync', 'watch'],
        callback
    )
});

gulp.task('watch', function() {
    gulp.watch(paths.css, ['styles']);
    gulp.watch(paths.scriptsTS, ['ts']);
    gulp.watch(paths.html, ['html']);
});