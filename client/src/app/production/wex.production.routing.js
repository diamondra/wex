appProduction.config(function($routeProvider, $locationProvider, WEX_CONFIG)
{
	var roles = WEX_CONFIG().ROLES;
	$locationProvider.hashPrefix('');
    $routeProvider
    //Assignment
    .when('/production', {
        controller: 'AssignmentListCtrl',
        templateUrl: '/app/production/assignment/views/assignment-list.html',
		title: 'Liste des affectations',
    })
    .when('/production/assignment', {
        controller: 'AssignmentListCtrl',
        templateUrl: '/app/production/assignment/views/assignment-list.html',
		title: 'Liste des affectations',
    })
    .when('/production/assignment/create', {
        controller: 'AssignmentCreateCtrl',
        templateUrl: '/app/production/assignment/views/assignment-edit.html',
		title: 'Créer une affectation',
    })
    .when('/production/assignment/edit/:id', {
        controller: 'AssignmentEditCtrl',
        templateUrl: '/app/production/assignment/views/assignment-edit.html',
		title: 'Editer un affectation',
    })
    //Activity report
    .when('/production/activityreport/', {
        controller: 'ActivityReportCtrl',
		title: 'Mes activités',
    })
    .when('/production/activityreport/team', {
        controller: 'ActivityReportTeamCtrl',
		title: 'Activités de l\'équipe',
    })
    .when('/production/activityreport/:id/:wid', {
        controller: 'ActivityReportEditCtrl',
		templateUrl: '/app/production/activityreport/views/activityreport-edit.html',
		title: 'Mes activités',
    })
    .when('/production/activityreport/:id/:wid/:year', {
        controller: 'ActivityReportEditCtrl',
		templateUrl: '/app/production/activityreport/views/activityreport-edit.html',
		title: 'Mes activités',
    })		
});