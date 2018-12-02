var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var uglify = require('gulp-uglify'); //压缩js
var mincss = require('gulp-clean-css'); //压缩css
var autoprefixer = require('gulp-autoprefixer'); //添加前缀
var server = require('gulp-webserver'); //起服务
var url = require('url');
var path = require('path');
var fs = require('fs');


//编译scss
gulp.task('devscss', function() {
    return gulp.src('./src/scss/*.scss')

    .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devscss'))
})

//起服务
gulp.task('devserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                // console.log(pathname)
                if (pathname == '/favicon.ico') {
                    return res.end('');
                }
                pathname = pathname === '/' ? './src/index.html' : pathname;
                res.end();
            }
        }))
})

//开发环境
gulp.task('dev', gulp.series('devscss', 'devserver', 'watch'));