app.directive('wexFormActionBtn', [function() 
{ 
    return { 
        replace: true,
		scope: {
			btnSubmitTitle: '@',
			btnCancelTitle: '@',
			btnCancelHref : '@'
		},
		templateUrl: '/app/partials/formactionbtn/views/formactionbtn.html'
    };
}]);