var gulp = require('gulp');
var rename=require('gulp-rename');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var contentIncluder=require('gulp-content-includer');
var less=require('gulp-less');
var minifycss=require('gulp-minify-css');
var browserSync=require('browser-sync').create();


var url='userCollect';
var urlHtml='./source/'+url+'/'+url+'.html';

//自动刷新浏览器
gulp.task('refresh',function(){
	browserSync.init({
		 server: {
            baseDir: "./target/"
        }
	});
	gulp.watch('./target/**').on('change',browserSync.reload);
})

//合并html代码块
gulp.task('concat',function() {
    gulp.src(urlHtml)
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest('./sourceix3.0'));
});
gulp.watch(['./source/common/**/*.html','./source/'+url+'/**/*.html','./source/'+url+'/*.html'],['concat']);

//合并css
gulp.task('concatCss',function(){
	gulp.src(['./source/common/*.less','./source/common/**/*.less','./source/'+url+'/**/*.less'])
			.pipe(concat(url+'.less'))
			.pipe(less())
			.pipe(minifycss())
			.pipe(gulp.dest('./target/css'))
})
gulp.watch(['./source/common/*.less','./source/common/**/*.less','./source/'+url+'/*.less','./source/'+url+'/**/*.less'],['concatCss'])

//合并js
gulp.task('concatJs',function(){
	gulp.src(['./source/common/*.js','./source/common/**/*.js','./source/'+url+'/*.js','./source/'+url+'/**/*.js'])
			.pipe(concat(url+'.js'))
//			.pipe(uglify())
			.pipe(gulp.dest('./target/js'))
})
gulp.watch(['./source/common/*.js','./source/common/**/*.js','./source/'+url+'/**/*.js'],['concatJs'])

var jsUrl='./source/uploadFile/problem/problem.js';

//检查js
//gulp.task('js',function(){
//	gulp.src(jsUrl)
//		.pipe(jshint())
//		.pipe(jshint.reporter('default'))
//});
//gulp.watch(jsUrl,['js']);

//gulp.task('default',['concat','concatCss','concatJs','js']);


gulp.task('images', function () {
    gulp.src('./target/img_1/*.*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant({quality: '65-80'})]
        }))
        .pipe(gulp.dest('./target/img'));
});

gulp.task('default',['refresh','concat','concatCss','concatJs']);