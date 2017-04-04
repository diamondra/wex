appSettings.config(function($routeProvider,$locationProvider, WEX_CONFIG)
{
	var roles = WEX_CONFIG().ROLES;
	$locationProvider.hashPrefix('');
    $routeProvider
	.when('/settings/role', {
        controller: 'RoleListCtrl',
        templateUrl: '/app/js/settings/role/views/role-list.html',
		title: 'Module user',
		role : [roles.ROLE_SUPER_ADMIN]
    })
	.when('/settings/crm', {
        controller: 'SettingsCrmCtrl',
        templateUrl: '/app/js/settings/crm/views/crm.html',
		title: 'Module crm',
		role : [roles.ROLE_SUPER_ADMIN]
    })	
});