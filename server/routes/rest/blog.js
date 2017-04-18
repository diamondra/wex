var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../../models/Blog');
var Person = require('../../models/Person');

const passport = require('passport');

router.get('/', function(req, res, next) {
  Blog.find().exec(function (err, blog) {
    if (err) return next(err);
    res.json(blog);
  });
});

router.post('/', function(req, res, next) {
	Blog.create(req.body, function (err, blog) {
		if (err) return next(err);
		
		Person.findById(blog.owner, function (err, person) {
			if (err) return next(err);
			
			person.blogs.push(blog);
			person.save(function(err){
				if (err) return next(err);
				res.json(blog);
			});
		});
		
		
	  });
});

module.exports = router;
