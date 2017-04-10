'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var nodemon = require('nodemon');

//TODO : separate this task to buildBowerScript, buildBlurAdminScript, buildWexScript
//                             buildBowerStyles, buildBlurAdminStyles, buildWexStyles
gulp.task('buildClient-dev', function () {
	return gulp.src(path.join(conf.paths.clientSrc, '/**/*'))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/')));
});

gulp.task('watchClient', function () {
	gulp.watch([path.join(conf.paths.clientSrc, '/**/*')], ['buildClient-dev']);
});

gulp.task('test', function(){
	console.log(process.argv);
});