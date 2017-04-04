var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var Role = require('../../models/Settings/Role');

const passport = require('passport');

/* GET /roles listing. */
router.get('/', function(req, res, next) {
  Role.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* GET /roles/id */
router.get('/:id', function(req, res, next) {
  Role.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST / create role */
router.post('/', function(req, res, next) {
	Role.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	  });
});

/* PUT /roles/:id */
router.put('/:id', function(req, res, next) {
  Role.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /roles/:id */
router.delete('/:id', function(req, res, next) {
  Role.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
