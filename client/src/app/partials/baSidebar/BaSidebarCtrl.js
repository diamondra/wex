/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  function BaSidebarCtrl($scope, Auth, baSidebarService, WEX_CONFIG) {

    $scope.menuItems = WEX_CONFIG().MENU;
	
    $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

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
	
	$scope.checkProductive = function(needsProductive)
	{
		if (!needsProductive) return true;
		
		return Auth.isUserProductive(Auth.getUser().roles);
	};
	
    $scope.toggleActive = function(index, childIndex)
    {
        for (var i = 0; i < $scope.menuItems.length; i++)
        {
            $scope.menuItems[i].active = false;
			if ($scope.menuItems[i].subMenu){
				for (var j = 0; j < $scope.menuItems[i].subMenu.length; j++)
				{
					$scope.menuItems[i].subMenu[j].active = false;
				}
			}
        }
		if (childIndex > -1){
			$scope.menuItems[index].subMenu[childIndex].active = true;
		}
		else {
			$scope.menuItems[index].active = true;
		}
    };		
  }
})();