var gulp = require('gulp');
var css = require("gulp-clean-css");
var sass = require('gulp-sass');
var server = require('gulp-webserver');
//编译scss压缩css
gulp.task('css', function() {
        return gulp.src('./src/scss/index.scss')
            .pipe(sass())
            .pipe(css())
            .pipe(gulp.dest('./src/css'))
    })
    //监听css
gulp.task('watch', function() {
        return gulp.watch('./src/scss/index.scss', gulp.series('css'))
    })
    //整合任务
gulp.task('dev', gulp.series('css', 'watch'));