appProduction.controller('ActivityReportEditCtrl', ['$scope', '$routeParams', 'ActivityReport', 'wexHelpers', function($scope, $routeParams, ActivityReport, wexHelpers) 
{
	var path = ActivityReport.getPath();
	
	$scope.id = $routeParams.id;
	$scope.wid = ($routeParams.wid == 'current') ? wexHelpers.getWeekOfYear(new Date()) : $routeParams.wid;
	$scope.year = ($routeParams.year) ? $routeParams.year : (new Date()).getFullYear();
	
	$scope.daysOfWeek = wexHelpers.get5DaysWeekFromWeekNumber($scope.wid, (new Date()).getFullYear());
	$scope.nextWeek = parseInt($scope.wid) + 1;
	$scope.prevWeek = $scope.nextWeek - 2;
	
	$scope.assignments = [];	 
	
	ActivityReport.get(
		$scope.id + '/' + $scope.wid + '/' + $scope.year,
		function(data){
			$scope.assignments = data;
		}
	);
	
	//return array of object
	//1 object
	//    { pid : '', 
	//      activities:[
	//          {'aid':'', reports[0,0,0,0,0]}
	//      ]
	var getActivities = function(assignments)
	{
		var returnActivities = [];
		var elt = {};
		var actArray = [];
		var actObj = {};
		for (i=0;i<assignments.length;i++){
			ass = assignments[i];
			actArray = [];
			for (j=0;j<ass.project.project_type.activities.length;j++){
				act = ass.project.project_type.activities[j];
				actObj = {'aid':act._id, 'reports':act.reports}
				actArray.push(actObj);
			}
			elt = {pid:ass.project._id, activities:actArray};
			returnActivities.push(elt);
		}
		
		return returnActivities;
	}
		
	$scope.report = function(){
		console.log($scope.assignments);
		var activities = getActivities($scope.assignments);
		
		ActivityReport.setPath(path + '/' + $scope.id + '/' + $scope.wid + '/' + $scope.year);
		ActivityReport.post(
			angular.toJson(activities), 
			function(data){
				if(data.error){
					console.log(data.error);
				}
				else {
					console.log(data);
				}
				
				ActivityReport.setPath(path);
			}
		);
	}
}]);
