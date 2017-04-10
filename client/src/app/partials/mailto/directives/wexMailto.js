app.directive('wexMailto', [function() 
{ 
    return { 
        replace: true,
		scope: {
		  email: '='
		},
		template: '<a href="mailto:{{email}}">{{email}}</a>'
    };
}]);