var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var ActivityReport = require('../../models/Production/ActivityReport');
var Assignment = require('../../models/Production/Assignment');
var Activity = require('../../models/Settings/Activity');
var Project = require('../../models/Crm/Project');
var User = require('../../models/User/User');
var DateHelpers = require('../../helpers/DateHelpers');

const passport = require('passport');

/* GET my ActivityReport for a week number */
router.get('/my/:wnum/:year', function(req, res, next) {
	//TODO get activity report for user = req.user, activity = each activity, project = eachproject, dtActivity in wnum week
	var daysWeek = DateHelpers.get5DaysWeekFromWeekNumber(req.params.wnum, req.params.year);

	Assignment
		.find(
			{$and :
				[
					{'user':req.user.id}, 
					{$and : [ {'dt_start':{'$lte':daysWeek[4]}}, {'dt_end':{'$gte':daysWeek[0]}} ] }
				]
			}
		)
		.sort({'project':'asc', 'project.project_type.activities.activity':'asc'})
		.populate({path:'project', populate:{path:'project_type', populate:{path:'activities'}}})
		.exec(function (err, assignments) {
			if (err) return next(err);
			
			var projectIds = [];
			var activityIds = [];
			for (i=0;i<assignments.length;i++){
				project = assignments[i].project;
				projectIds.push(project._id);
				for (j=0;j<project.project_type.activities.length;j++){
					activity = project.project_type.activities[j];
					activityIds.push(activity._id);
				}
			}
			
			var activityreports = [];

			ActivityReport 
				.find(
					{$and :
						[
							{'user':req.user.id}, 
							{'project':{$in:projectIds}}, 
							{'activity':{$in:activityIds}},
							{$and : [ {'dt_activity':{'$lte':daysWeek[4]}}, {'dt_activity':{'$gte':daysWeek[0]}} ] }
						]
					}
				)
				.sort({'project':'asc', 'activity':'asc'})
				.exec(function(err, activityreport) {
					if (err) return next(err);
					activityreports = activityreport; // 30 records
					
					var project = null;
					var activity = null;
					
					for (i=0;i<assignments.length;i++){ // 2 records
						project = assignments[i].project;
						
						for (j=0;j<project.project_type.activities.length;j++){ // 3 records
							activity = project.project_type.activities[j];
							activity.reports = [];
							if (activityreports.length == 0){
								console.log(activityreports.length);
								activity.reports = [{'arid':'0', 'value':0}, {'arid':'0', 'value':0}, {'arid':'0', 'value':0}, {'arid':'0', 'value':0}, {'arid':'0', 'value':0}];
								console.log(activity.reports);
							}
							else {
								var arResults = activityreports.
									filter(
										function(item){
											return item.project.toString()==project._id.toString() 
												&& item.activity.toString()==activity._id.toString();
										})
									.sort(
										function(itema, itemb){
											return itema.dt_activity > itemb.dt_activity;
										}
									);
								activity.reports.push({'arid':arResults[0]._id.toString(), 'value':arResults[0].hours}); //0 => d1, 1 => d2 ... 4 => d5
								activity.reports.push({'arid':arResults[1]._id.toString(), 'value':arResults[1].hours});
								activity.reports.push({'arid':arResults[2]._id.toString(), 'value':arResults[2].hours});
								activity.reports.push({'arid':arResults[3]._id.toString(), 'value':arResults[3].hours});
								activity.reports.push({'arid':arResults[4]._id.toString(), 'value':arResults[4].hours});
							}
						}
					}

					res.json(assignments);
				});
		
	});
	
});

router.post('/my/:wnum/:year', function(req, res, next) {
	var daysWeek = DateHelpers.get5DaysWeekFromWeekNumber(req.params.wnum, req.params.year);
	
	var projects = JSON.parse(req.body['']);
	console.log(projects);

	for (i=0;i<projects.length;i++)
	{
		project = projects[i];
		for (j=0;j<project.activities.length;j++){
			act = project.activities[j];
			
			for (k=0;k<act.reports.length;k++){
				reportvalue = act.reports[k].value;
				reportid = act.reports[k].arid.toString();
				
				if (reportid=="0"){
					var activityreport = new ActivityReport();
					activityreport.activity = act.aid;
					activityreport.user = req.user.id;
					activityreport.project = project.pid;
					activityreport.hours = parseInt(reportvalue);
					activityreport.dt_activity = daysWeek[k];
					
					activityreport.save(function(err){
						if (err) console.log(err);
					});
				}
				else { //TODO : update 
					ActivityReport.findByIdAndUpdate(reportid, {'hours':reportvalue}, 
						function (err, post) {
							if (err) console.log(err);
					  });
				}
			}
			
		}
	}
	res.json('ok'); // on renvoie le résultat tout de suite
});

module.exports = router;
