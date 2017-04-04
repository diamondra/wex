appCrm.config(function($routeProvider, $locationProvider, WEX_CONFIG)
{
	var roles = WEX_CONFIG().ROLES;
	$locationProvider.hashPrefix('');
    $routeProvider
    //Client
    .when('/crm', {
        controller: 'ClientListCtrl',
        templateUrl: '/app/js/crm/client/views/client-list.html',
		title: 'Liste des clients',
    })
    .when('/crm/client', {
        controller: 'ClientListCtrl',
        templateUrl: '/app/js/crm/client/views/client-list.html',
		title: 'Liste des clients',
    })
    .when('/crm/client/create', {
        controller: 'ClientCreateCtrl',
        templateUrl: '/app/js/crm/client/views/client-edit.html',
		title: 'Créer un client',
    })
    .when('/crm/client/edit/:id', {
        controller: 'ClientEditCtrl',
        templateUrl: '/app/js/crm/client/views/client-edit.html',
		title: 'Editer un client',
    })
    .when('/crm/project', {
        controller: 'ProjectListCtrl',
        templateUrl: '/app/js/crm/project/views/project-list.html',
		title: 'Liste des projets',
    })
    .when('/crm/project/create', {
        controller: 'ProjectCreateCtrl',
        templateUrl: '/app/js/crm/project/views/project-edit.html',
		title: 'Créer un projet',
    })
	//créer un projet à partir d'un client id
    .when('/crm/project/create/:id', {
        controller: 'ProjectCreateCtrl',
        templateUrl: '/app/js/crm/project/views/project-edit.html',
		title: 'Créer un projet',
    })	
    .when('/crm/project/edit/:id', {
        controller: 'ProjectEditCtrl',
        templateUrl: '/app/js/crm/project/views/project-edit.html',
		title: 'Editer un projet',
    })	
});