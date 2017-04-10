var appSettings = angular.module('wexApp.settings',[]);
appSettings.constant(
	"WEX_CONFIG", function()
	{
		var _roles = {
			ROLE_SUPER_ADMIN : '58deadb8c29e71206c56b6c9',          // accès à tout
			ROLE_DIR_OP : '58deaed1c29e71206c56b6ca',                    // accès à tout sauf configuration systeme
			ROLE_SITE_MANAGER : '58deaf86c29e71206c56b6cb',        // accès à toutes les données de son site
			ROLE_PROJECT_MANAGER : '58deb072c29e71206c56b6cc',  // accès à tous ses projets et les devs rattachés
			ROLE_OFFICE_MANAGER : '58deb07bc29e71206c56b6cd',    // accès aux RH / CDG / Fournisseurs / Besoins / Devis
			ROLE_DEV : '58deb085c29e71206c56b6ce',                          // accès à ses projets
			ROLE_IT_MANAGER : '58deb08dc29e71206c56b6cf'             // accès aux besoins, parc
		};
		
		var config = {
			"ROLES" : _roles,
			"MENU" : [
				{
					name: 'dashboard',
					title: 'Dashboard',
					url: '#/',
					icon: 'ion-android-home',
					active: true,
					needsProductive : false,
					stateRef : 'dashboard',
					level:0
				},
				{
					name: 'todo',
					title: 'Todo',
					url: '#/todo',
					icon: 'ion-compose',
					active: false,
					needsProductive : false,
					stateRef : 'todo',
					level:0
				},
				{
					name: 'crm',
					title: 'Crm',
					icon: 'ion-compose',
					active: false,
					needsProductive : true,
					subMenu : [
						{
							name : 'crm.client',
							title : 'Liste des clients',
							url : '#/crm/client',
							stateRef : 'crm.client',
							level:1,
							active: false,
						},
						{
							name : 'crm.project',
							title : 'Liste des projets',
							url : '#/crm/project',
							stateRef : 'crm.project',
							level:1,
							active: false,
						}
					]
				},
				{
					name: 'production',
					title: 'Production',
					icon: 'ion-ios-briefcase',
					active: false,
					needsProductive : true,
					subMenu : [
						{
							name : 'production.assignment',
							title : 'Liste des affectations',
							url : '#/production/assignment',
							stateRef : 'production.assignment',
							level:1,
							active: false,
						},
					]
				},				
				{
					name: 'user',
					title: 'User',
					url: '#/user',
					icon: 'ion-person-stalker',
					active: false,
					role : [_roles.ROLE_SUPER_ADMIN, _roles.ROLE_DIR_OP, _roles.ROLE_SITE_MANAGER, _roles.ROLE_OFFICE_MANAGER],
					needsProductive : false,
					stateRef : 'user',
					level:0
				},		
				{
					name: 'settings',
					title: 'Configuration',
					url: '#/settings',
					icon: 'ion-gear-a',
					active: false,
					role : [_roles.ROLE_SUPER_ADMIN],
					needsProductive : false,
					stateRef : 'settings',
					level:0,
					subMenu : [
						{
							name : 'settings.role',
							title : 'Module user',
							url : '#/settings/role',
							stateRef : 'settings.role',
							level:1,
							active: false,
						},
						{
							name : 'settings.crm',
							title : 'Module crm',
							url : '#/settings/crm',
							stateRef : 'settings.crm',
							level:1,
							active: false,
						},						
					]					
				},		
			]
		}
		
		return config;
	}
);
