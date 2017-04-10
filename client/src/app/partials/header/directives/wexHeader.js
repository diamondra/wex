app.directive('wexHeader', [function() 
{ 
    return { 
        restrict: 'E', 
        replace: true,
		templateUrl: '/app/partials/header/views/header.html',
    };
}]);