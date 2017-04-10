appDashboard.controller('DashboardCtrl', ['$scope', '$location', function($scope, $location) 
{
	//TODO : show dashboard = f(ROLE)
    $location.path('/dashboard');
}]);

appDashboard.controller('DashboardDefaultCtrl', ['$scope', '$location', function($scope, $location) 
{

}]);
