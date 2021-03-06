var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var ProjectType = require('../../models/Crm/ProjectType');
var Activity = require('../../models/Settings/Activity');

const passport = require('passport');

/* GET /ProjectTypes listing. */
router.get('/', function(req, res, next) {
  ProjectType
	.find()
	.populate('activities')
	.exec(function (err, projectType) {
		if (err) return next(err);
		res.json(projectType);
	});
});

/* GET /ProjectTypes/id */
router.get('/:id', function(req, res, next) {
  ProjectType.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST / create ProjectType */
router.post('/', function(req, res, next) {
	ProjectType.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	  });
});

/* PUT /ProjectTypes/:id */
router.put('/:id', function(req, res, next) {
  ProjectType.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /ProjectTypes/:id */
router.delete('/:id', function(req, res, next) {
  ProjectType.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
