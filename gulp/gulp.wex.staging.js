'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var nodemon = require('nodemon');

//TODO : separate this task to buildBowerScript, buildBlurAdminScript, buildWexScript
//                             buildBowerStyles, buildBlurAdminStyles, buildWexStyles
gulp.task('buildClient-staging', function () {
	return gulp.src(path.join(conf.paths.clientSrc, '/**/*'))
		.pipe(gulp.dest(path.join(conf.paths.devDist, '/')));
});

gulp.task('test-staging', function(){
	console.log(process.argv);
});