appSettings.controller('RoleListCtrl', ['$scope', 'Role', function($scope, Role) 
{
    $scope.title = 'Liste des rôles';
	$scope.smartTablePageSize = 10;
    $scope.filters =    {
                            offset: null,
                            limit: 20
                        };
						
	var getRoleList = function(){ 
		Role.getList(
			$scope.filters,
			function(data)
			{
				$scope.entities = data;
				$scope.entities_safe = data;
			}
		);
	}
	
	getRoleList();
	
    $scope.delete = function(id)
    {
        Role.delete(id, function()
        {
            getRoleList();
        });
    };	
}]);
