'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var nodemon = require('nodemon');

var tasks = {
		dev : ['buildClient-dev', 'watchClient'], //only watch on dev environnement
		staging : ['buildClient-staging'],
		prod : ['buildClient-prod'],
}

gulp.task('nodemon', tasks[(process.env.NODE_ENV || "dev")], function(){
	nodemon({
		script: 'app.js'
	});
});

gulp.task('server:run', ['nodemon'], function(){
});
