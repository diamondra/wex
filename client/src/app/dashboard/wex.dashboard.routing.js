appDashboard.config(function($routeProvider,$locationProvider, WEX_CONFIG)
{
	var roles = WEX_CONFIG().ROLES;
	$locationProvider.hashPrefix('');
    $routeProvider
    //Dashboard
    .when('/', {
        controller: 'DashboardCtrl',
        template:'',
		title: 'Dashboard'
    })
	.when('/dashboard', {
        controller: 'DashboardDefaultCtrl',
        templateUrl: '/app/dashboard/views/dashboard.html',
		title: 'Dashboard'
    })
});