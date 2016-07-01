var gulp = require('gulp');
var rename=require('gulp-rename');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var contentIncluder=require('gulp-content-includer');
var less=require('gulp-less');
var minifycss=require('gulp-minify-css');
var browserSync=require('browser-sync').create();

//自动刷新浏览器
gulp.task('refresh',function(){
	browserSync.init({
		 server: {
            baseDir: "./appix3.0/"
        }
	});
	gulp.watch('./appix3.0/**').on('change',browserSync.reload);
})

//合并html代码块
gulp.task('concat',function() {
    gulp.src("./app/userCenter/userCenter.html")
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest('./appix3.0'));
});
gulp.watch(['./app/common/**/*.html','./app/userCenter/**/*.html','./app/userCenter/*.html'],['concat']);

//合并css
gulp.task('concatCss',function(){
	gulp.src(['./app/common/**/*.less','./app/userCenter/**/*.less'])
			.pipe(less())
			.pipe(concat('userCenter.css'))
			.pipe(minifycss())
			.pipe(gulp.dest('./appix3.0/css'))
})
gulp.watch(['./app/common/**/*.less','./app/userCenter/**/*.less'],['concatCss'])

//合并js
gulp.task('concatJs',function(){
	gulp.src(['./app/common/**/*.js','./app/userCenter/**/*.js'])
			.pipe(concat('userCenter.js'))
			.pipe(gulp.dest('./appix3.0/js'))
})
gulp.watch(['./app/common/**/*.js','./app/userCenter/**/*.js'],['concatJs'])

gulp.task('default',['refresh','concat','concatCss','concatJs'])