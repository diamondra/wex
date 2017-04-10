app.directive('wexContenttop', ['$route',function($route) 
{ 
    return { 
        restrict: 'E', 
        replace: true,
		templateUrl: '/app/partials/contenttop/views/contenttop.html',
		link: function($scope) {
			$scope.$watch(function () {
				if ($route.current){
					$scope.activePageTitle = $route.current.$$route.title;
				}
			});
		  }
    };
}]);