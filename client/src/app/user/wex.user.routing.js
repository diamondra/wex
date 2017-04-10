appUser.config(function($routeProvider,$locationProvider, WEX_CONFIG)
{
	var roles = WEX_CONFIG().ROLES;
	$locationProvider.hashPrefix('');
    $routeProvider
	.when('/user', {
        controller: 'UserListCtrl',
        templateUrl: '/app/user/views/user-list.html',
		title: 'Liste des utilisateurs',
		role : [roles.ROLE_SUPER_ADMIN, roles.ROLE_DIR_OP, roles.ROLE_SITE_MANAGER, roles.ROLE_OFFICE_MANAGER]
    })
	.when('/user/create', {
        controller: 'UserCreateCtrl',
        templateUrl: '/app/user/views/user-edit.html',
		title: 'Créer un utilisateur',
		role : [roles.ROLE_SUPER_ADMIN, roles.ROLE_DIR_OP, roles.ROLE_SITE_MANAGER, roles.ROLE_OFFICE_MANAGER]
    })
	.when('/user/edit/:id', {
        controller: 'UserEditCtrl',
        templateUrl: '/app/user/views/user-edit.html',
		title: 'Modifier un utilisateur',
		role : [roles.ROLE_SUPER_ADMIN, roles.ROLE_DIR_OP, roles.ROLE_SITE_MANAGER, roles.ROLE_OFFICE_MANAGER]
    })
});