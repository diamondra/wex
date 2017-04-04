app.directive('wexFormActionBtn', [function() 
{ 
    return { 
        replace: true,
		scope: {
			btnSubmitTitle: '@',
			btnCancelTitle: '@',
			btnCancelHref : '@'
		},
		templateUrl: '/app/js/partials/formactionbtn/views/formactionbtn.html'
    };
}]);