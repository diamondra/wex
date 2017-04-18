var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var Person = require('../../models/Person');
var Blog = require('../../models/Blog');

const passport = require('passport');

router.get('/', function(req, res, next) {
  Person.find().populate([{path:'blogs', model:'Blog'}]).exec(function (err, person) {
    if (err) return next(err);
    res.json(person);
  });
});

router.post('/', function(req, res, next) {
	Person.create(req.body, function (err, person) {
		if (err) return next(err);
		res.json(person);
	  });
});

module.exports = router;
