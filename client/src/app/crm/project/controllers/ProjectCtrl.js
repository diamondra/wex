appCrm.controller('ProjectListCtrl', ['$scope', 'Project', function($scope, Project) 
{
    $scope.title = 'Liste des Projets';
	$scope.smartTablePageSize = 10;
    $scope.filters =    {
                            offset: null,
                            limit: 20
                        };
						
	var getProjectList = function(){ 
		Project.getList(
			$scope.filters,
			function(data)
			{
				console.log(data);
				$scope.entities = data;
				$scope.entities_safe = data; // nécessaire pour que ui-sortable marche
			}
		);
	}
	
	getProjectList();
	
    $scope.delete = function(id)
    {
        Project.delete(id, function()
        {
            getProjectList();
        });
    };	
}]);

appCrm.controller('ProjectCreateCtrl', ['$scope', '$location', 'Project', 'Client', 'ProjectType', function($scope, $location, Project, Client, ProjectType) 
{
	$scope.clients = {};
	
	Client.getList(
			$scope.filters,
			function(data)
			{
				$scope.clients = data;
			}
		);
		
	$scope.projectTypes = {};
	
	ProjectType.getList(
			$scope.filters,
			function(data)
			{
				$scope.projectTypes = data;
			}
		);		
		
    $scope.data = {};
	$scope.wexForm = {};
    $scope.submit = function()
    {
        if ($scope.wexForm.form_project.$valid) {
            Project.post($scope.data, function(data)
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
                    $location.path('/crm/project');  
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

appCrm.controller('ProjectEditCtrl', ['$scope', '$routeParams', '$location', 'Project', 'Client', 'ProjectType', function($scope, $routeParams, $location, Project, Client, ProjectType) 
{
	$scope.clients = {};
	
	Client.getList(
			$scope.filters,
			function(data)
			{
				$scope.clients = data;
			}
		);
		
	$scope.projectTypes = {};
	
	ProjectType.getList(
			$scope.filters,
			function(data)
			{
				$scope.projectTypes = data;
			}
		);			
		
	$scope.id = $routeParams.id; 
	Project.get($routeParams.id, 
			function(data){
				$scope.data.project = data;
			}
	);
	
    $scope.data = {};
	$scope.wexForm = {};
    $scope.submit = function()
    {
        if ($scope.wexForm.form_project.$valid) {
            Project.put($scope.id, $scope.data, function(data)
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
                    $location.path('/crm/project');  
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