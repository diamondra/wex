var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var Assignment = require('../../models/Production/Assignment');

const passport = require('passport');

/* GET /Assignments listing. */
router.get('/', function(req, res, next) {
  Assignment.find().populate('user').populate('project').exec(function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* GET /Assignments/id */
router.get('/:id', function(req, res, next) {
  Assignment.findById(req.params.id, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* POST / create Assignment */
router.post('/', function(req, res, next) {
	Assignment.create(req.body, function (err, assignment) {
		if (err) return next(err);
		res.json(assignment);
	  });
});

/* PUT /Assignments/:id */
router.put('/:id', function(req, res, next) {
  Assignment.findByIdAndUpdate(req.params.id, req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* DELETE /Assignments/:id */
router.delete('/:id', function(req, res, next) {
  Assignment.findByIdAndRemove(req.params.id, req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

module.exports = router;
