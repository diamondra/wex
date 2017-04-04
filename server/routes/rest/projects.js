var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../../models/Crm/Project');

const passport = require('passport');

/* GET /Projects listing. */
router.get('/', function(req, res, next) {
  Project.find().populate('client').populate('project_type').exec(function (err, Projects) {
    if (err) return next(err);
    res.json(Projects);
  });
});

/* GET /Projects/id */
router.get('/:id', function(req, res, next) {
  Project.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST / create Project */
router.post('/', function(req, res, next) {
	Project.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	  });
});

/* PUT /Projects/:id */
router.put('/:id', function(req, res, next) {
  Project.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Projects/:id */
router.delete('/:id', function(req, res, next) {
  Project.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
