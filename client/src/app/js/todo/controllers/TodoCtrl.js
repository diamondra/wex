app.controller('TodoListCtrl', ['$scope', 'Todo', function($scope, Todo) 
{
    $scope.title = 'Mes notes';
	$scope.smartTablePageSize = 10;
    $scope.filters =    {
                            offset: null,
                            limit: 20
                        };
	Todo.getList(
		$scope.filters,
		function(data)
		{
			$scope.entities = data;
			$scope.entities_safe = data;
		}
	);
}]);

app.controller('TodoCreateCtrl', ['$scope', '$location', 'Todo', 'Auth', function($scope, $location, Todo, Auth) 
{
    $scope.data = {};
	if (Auth.isLogged()){
		$scope.data.owner = Auth.getUser().id;
	}
	$scope.wexForm = {};
    $scope.submit = function()
    {
        if ($scope.wexForm.form_todo.$valid) {
            Todo.post($scope.data, function(data)
            {
                if(data.error)
                {
                    $scope.messageClass='alert-danger';
                    $('#afficheur_message').html(data.error);  
                    $scope.message = data.error;
                    var champs = data.champ.split(",");
                    for( i in champs)
                    {   
                        $('#'+champs[i]).addClass('ng-invalid'); 
                    }
                }
                else
                {
                    $location.path('/todo');  
                }
            });
        }
        else
        {
            $scope.messageClass='alert-danger';
            $('#afficheur_message').html('Désolé mais il y a des données non valides !');
            $scope.message = 'alert';
        }
    };
}]);