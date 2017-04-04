/* TODO : mettre à jour active quand on change de route */
app.controller('SidebarCtrl', ['$scope', 'Auth', function($scope, Auth) 
{
    $scope.menu = [
        {
            name: 'Dashboard',
            url: '#/',
            icon: 'ion-android-home',
            active: true,
			needsProductive : false,
		},
        {
            name: 'Todo',
            url: '#/todo',
            icon: 'ion-compose',
            active: false,
			needsProductive : false,
		},
        {
            name: 'Crm',
            url: '#/crm',
            icon: 'ion-compose',
            active: false,
			needsProductive : true,
			subMenu : [
				{
					name : 'Liste des clients',
					url : '#/crm/client'
				},
				{
					name : 'Liste des projets',
					url : '#/crm/projet'					
				}
			]
		},		
        {
            name: 'User',
            url: '#/user',
            icon: 'ion-person-stalker',
            active: false,
			role : [Auth.roles.ROLE_SUPER_ADMIN, Auth.roles.ROLE_DIR_OP, Auth.roles.ROLE_SITE_MANAGER],
			needsProductive : false,
		},		
        {
            name: 'Configuration',
            url: '#/settings',
            icon: 'ion-gear-a',
            active: false,
			role : [Auth.roles.ROLE_SUPER_ADMIN],
			needsProductive : false,
		},		
	];
	$scope.hasRole = function(role)
    {
        if (!role)
        {
            return true;
        }
        else if (!Auth.isLogged())
        {
            return false;
        }
        else
        {
            return Auth.hasRole(role); 
        }
    };
    $scope.toggleActive = function(index, isChild)
    {
        for (var i = 0; i < $scope.menu.length; i++)
        {
            $scope.menu[i].active = false;
        }
        $scope.menu[index].active = true;
    };	
	$scope.checkProductive = function(needsProductive)
	{
		if (!needsProductive) return true;
		
		return Auth.isUserProductive(Auth.getUser().roles);
	}
	
    $scope.hoverItem = function ($event) {
      $scope.showHoverElem = true;
      $scope.hoverElemHeight =  $event.currentTarget.clientHeight;
      var menuTopValue = 66;
      $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
    };

    $scope.$on('$stateChangeSuccess', function () {
      if (baSidebarService.canSidebarBeHidden()) {
        baSidebarService.setMenuCollapsed(true);
      }
    });	
}]);
