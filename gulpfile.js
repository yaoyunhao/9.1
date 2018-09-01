var gulp = require('gulp');
var css = require("gulp-clean-css");
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var js = require('gulp-uglify');
var fs = require("fs");
var path = require('path');
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
    //压缩JS
gulp.task('js', function() {
        return gulp.src('./src/js/module/*.js')
            .pipe(js())
            .pipe(gulp.dest('./src/js/myjs'))
    })
    //开启服务
gulp.task("server", function() {
        return gulp.src('src')
            .pipe(server({
                port: 8080, //配置端口
                middleware: function(req, res, next) {
                    var pathname = require('url').parse(req.url).pathname;
                    if (pathname === "/favicon.ico") {
                        return res.end();
                    }
                    // pathname = pathname === "/" ? '/index.html' : pathname;

                    // res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    if (pathname === "/") {
                        res.end(fs.readFileSync("./src/index.html"))
                    } else {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                    }
                }
            }))
    })
    //整合任务
gulp.task('dev', gulp.series('css', 'js', 'server', 'watch'));