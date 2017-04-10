'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

//TODO : separate this task to buildBowerScript, buildBlurAdminScript, buildWexScript
//                             buildBowerStyles, buildBlurAdminStyles, buildWexStyles
gulp.task('buildClient-prod', function () {
	return gulp.src(path.join(conf.paths.clientSrc, '/**/*'))
		.pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('test-prod', function(){
	console.log(process.argv);
});