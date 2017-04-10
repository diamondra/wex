appCrm.controller('AssignmentListCtrl', ['$scope', 'Assignment', function($scope, Assignment) 
{
    $scope.title = 'Liste des affectations';
	$scope.smartTablePageSize = 10;
    $scope.filters =    {
                            offset: null,
                            limit: 20
                        };
						
	$scope.minAssignmentDate = moment().subtract(30, "days").format("X");
	$scope.maxAssignmentDate = moment().add(60, "days").format("X");	
	$scope.wexPrettifyDate = function(num)
	{
		return moment(num, "X").format("DD/MM/YY");
	}	
						
	var getAssignmentList = function(){ 
		Assignment.getList(
			$scope.filters,
			function(data)
			{
				
				for (i=0;i<data.length;i++){
					var asgnmt = data[i];
					asgnmt.moment_start = moment(asgnmt.dt_start).format("X");
					asgnmt.moment_end = moment(asgnmt.dt_end).format("X");
				}
				$scope.entities = data;
				$scope.entities_safe = data; // nécessaire pour que ui-sortable marche
			}
		);
	}
	
	getAssignmentList();
	
    $scope.delete = function(id)
    {
        Assignment.delete(id, function()
        {
            getAssignmentList();
        });
    };	
}]);

appCrm.controller('AssignmentCreateCtrl', ['$scope', '$location', 'Assignment', 'Project', 'User', function($scope, $location, Assignment, Project, User) 
{
	//populate users select
	$scope.users = [];
	User.getList(
			$scope.filters,
			function(data)
			{
				$scope.users = data;
			}
		);
	
	//populate projects select
	$scope.projects = [];
	Project.getList(
			$scope.filters,
			function(data)
			{
				$scope.projects = data;
			}
		);
		
    $scope.data = {};
	$scope.data.assignment = {};		
	
	//populate period slider
	$scope.minAssignmentDate = moment().format("X");
	$scope.maxAssignmentDate = moment().add(3, "months").format("X");
	
	//prettify slider
	$scope.wexPrettifyDate = function(num)
	{
		return moment(num, "X").format("DD/MM/YY");
	};
	//onChange slider handling
	$scope.sliderOnChange = function(data)
	{
		$scope.data.assignment.dt_start = moment(data.from, "X").format("MM/DD/YY");
		$scope.data.assignment.dt_end = moment(data.to, "X").format("MM/DD/YY");
	};	
	
	$scope.wexForm = {};
    $scope.submit = function()
    {
        if ($scope.wexForm.form_assignment.$valid) {
            Assignment.post($scope.data, function(data)
            {
                if(data.error)
                {
					//TODO : implement server error handling
					console.log(data.error);
                }
                else
                {
                    $location.path('/production/assignment');  
                }
            });
        }
        else
        {
			//TODO : implement invalid form logic
        }
    };
}]);

appCrm.controller('AssignmentEditCtrl', ['$scope', '$routeParams', '$location', 'Assignment', 'Project', 'User', function($scope, $routeParams, $location, Assignment, Project, User) 
{
	//populate users select
	$scope.users = [];
	User.getList(
			$scope.filters,
			function(data)
			{
				$scope.users = data;
			}
		);
	
	//populate projects select
	$scope.projects = [];
	Project.getList(
			$scope.filters,
			function(data)
			{
				$scope.projects = data;
			}
		);
		
	$scope.id = $routeParams.id; 
	Assignment.get($routeParams.id, 
			function(data){
				$scope.data.assignment = data;
				$scope.from = moment($scope.data.assignment.dt_start).format("X");
				$scope.to = moment($scope.data.assignment.dt_end).format("X");
			}
	);
	
	//populate period slider
	$scope.minAssignmentDate = moment().format("X");
	$scope.maxAssignmentDate = moment().add(3, "months").format("X");
	
	//prettify slider
	$scope.wexPrettifyDate = function(num)
	{
		return moment(num, "X").format("DD/MM/YY");
	};
	//onChange slider handling
	$scope.sliderOnChange = function(data)
	{
		$scope.data.assignment.dt_start = moment(data.from, "X").format("MM/DD/YY");
		$scope.data.assignment.dt_end = moment(data.to, "X").format("MM/DD/YY");
	};	
	
	$scope.data = {};
	$scope.wexForm = {};
    $scope.submit = function()
    {
        if ($scope.wexForm.form_assignment.$valid) {
            Assignment.put($scope.id, $scope.data, function(data)
            {
                if(data.error)
                {
                    //TODO : implement server error handling
					console.log(data.error);
                }
                else
                {
                    $location.path('/production/assignment');  
                }
            });
        }
        else
        {
            //TODO : implement invalid form logic
        }
    };
}]);