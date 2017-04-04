app.directive('wexHeader', [function() 
{ 
    return { 
        restrict: 'E', 
        replace: true,
		templateUrl: '/app/js/partials/header/views/header.html',
    };
}]);