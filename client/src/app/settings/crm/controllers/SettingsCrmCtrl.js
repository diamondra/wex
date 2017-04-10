appSettings.controller('SettingsCrmCtrl', ['$scope', function($scope) 
{

}]);

appSettings.controller('SettingsCrmProjectTypeCtrl', ['$scope', 'ProjectType', function($scope, ProjectType) 
{
    $scope.filters =    {};
	
	var initForm = function(){
		$scope.id = null;
		$scope.data = {};
		$scope.data.projecttype = {};		
	}
						
	var getProjectTypeList = function(){ 
		ProjectType.getList(
			$scope.filters,
			function(data)
			{
				$scope.entities = data;
				initForm();
			}
		);
	}
	
	getProjectTypeList();

	$scope.wexForm = {};
	$scope.submit = function()
	{
        if ($scope.wexForm.form_projecttype.$valid) {
			if ($scope.id){
				ProjectType.put($scope.id, $scope.data, function(data)
				{
					if(data.error)
					{
						console.log(data.error);
					}
					else
					{
						getProjectTypeList();
					}
				});
				
			}
			else {
				ProjectType.post($scope.data, function(data)
				{
					if(data.error)
					{
						console.log(data.error);
					}
					else
					{
						getProjectTypeList();
					}
				});
			}
        }
        else
        {
            console.log('form non valid');
        }		
	}
	
    $scope.delete = function(id)
    {
        ProjectType.delete(id, function()
        {
            getProjectTypeList();
        });
    };
	
    $scope.edit = function(id, index)
    {
        $scope.id = id;
		$scope.data.projecttype.name = $scope.entities[index].name;
    };	
}]);

appSettings.controller('SettingsCrmActivityCtrl', ['$scope', 'Activity', 'ProjectType', function($scope, Activity, ProjectType) 
{
    $scope.filters =    {};
	
	var initForm = function(){
		$scope.id = null;
		$scope.data = {};
		$scope.data.activity = {};		
	}
						
	var getActivityList = function(){ 
		Activity.getList(
			$scope.filters,
			function(data)
			{
				$scope.entities = data;
				initForm();
			}
		);
	}
	
	getActivityList();
	
	$scope.projectTypes = {};
	ProjectType.getList(
			$scope.filters,
			function(data)
			{
				$scope.projectTypes = data;
			}
		);

	$scope.wexForm = {};
	$scope.submit = function()
	{
        if ($scope.wexForm.form_activity.$valid) {
			if ($scope.id){
				Activity.put($scope.id, $scope.data, function(data)
				{
					if(data.error)
					{
						console.log(data.error);
					}
					else
					{
						getActivityList();
					}
				});
				
			}
			else {
				Activity.post($scope.data, function(data)
				{
					if(data.error)
					{
						console.log(data.error);
					}
					else
					{
						getActivityList();
					}
				});
			}
        }
        else
        {
            console.log('form non valid');
        }		
	}
	
    $scope.delete = function(id)
    {
        Activity.delete(id, function()
        {
            getActivityList();
        });
    };
	
    $scope.edit = function(id, index)
    {
        $scope.id = id;
		$scope.data.activity.name = $scope.entities[index].name;
		//TODO : sélectionner le type de projet
    };	
}]);