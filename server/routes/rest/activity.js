var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var Activity = require('../../models/Settings/Activity');
var ProjectType = require('../../models/Crm/ProjectType');

const passport = require('passport');

/* GET /Activitys listing. */
router.get('/', function(req, res, next) {
  Activity.find().populate('project_type').exec(function (err, activity) {
    if (err) return next(err);
    res.json(activity);
  });
});

/* GET /Activitys/id */
router.get('/:id', function(req, res, next) {
  Activity.findById(req.params.id, function (err, activity) {
    if (err) return next(err);
    res.json(activity);
  });
});

/* POST / create Activity */
router.post('/', function(req, res, next) {
	Activity.create(req.body, function (err, activity) {
		if (err) return next(err);
		
		ProjectType.findById(activity.project_type, function (err, projectType) {
			if (err) return next(err);
			
			projectType.activities.push(activity);
			projectType.save(function(err){
				if (err) return next(err);
				res.json(activity);
			});
		});		

	  });
});

/* PUT /Activitys/:id */
router.put('/:id', function(req, res, next) {
  Activity.findByIdAndUpdate(req.params.id, req.body, function (err, activity) {
    if (err) return next(err);
	res.json(activity);
  });
});

/* DELETE /Activitys/:id */
router.delete('/:id', function(req, res, next) {
  Activity.findByIdAndRemove(req.params.id, req.body, function (err, activity) {
    if (err) return next(err);
    res.json(activity);
  });
});

module.exports = router;
