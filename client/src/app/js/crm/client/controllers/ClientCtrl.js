appCrm.controller('ClientListCtrl', ['$scope', 'Client', function($scope, Client) 
{
    $scope.title = 'Liste des clients';
	$scope.smartTablePageSize = 10;
    $scope.filters =    {
                            offset: null,
                            limit: 20
                        };
						
	var getClientList = function(){ 
		Client.getList(
			$scope.filters,
			function(data)
			{
				$scope.entities = data;
				$scope.entities_safe = data; // nécessaire pour que ui-sortable marche
			}
		);
	}
	
	getClientList();
	
    $scope.delete = function(id)
    {
        Client.delete(id, function()
        {
            getClientList();
        });
    };	
}]);

appCrm.controller('ClientCreateCtrl', ['$scope', '$location', 'Client', function($scope, $location, Client) 
{
    $scope.data = {};
	$scope.wexForm = {};
    $scope.submit = function()
    {
        if ($scope.wexForm.form_client.$valid) {
            Client.post($scope.data, function(data)
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
                    $location.path('/crm/client');  
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

appCrm.controller('ClientEditCtrl', ['$scope', '$routeParams', '$location', 'Client', function($scope, $routeParams, $location, Client) 
{
	$scope.id = $routeParams.id; 
	Client.get($routeParams.id, 
			function(data){
				$scope.data.client = data;
			}
	);
	
    $scope.data = {};
	$scope.wexForm = {};
    $scope.submit = function()
    {
        if ($scope.wexForm.form_client.$valid) {
            Client.put($scope.id, $scope.data, function(data)
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
                    $location.path('/crm/client');  
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