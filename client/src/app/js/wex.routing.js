app.config(function($routeProvider,$locationProvider, WEX_CONFIG)
{
	var roles = WEX_CONFIG.ROLES;
	$locationProvider.hashPrefix('');
    $routeProvider
    //Autrement
    .otherwise({
            redirectTo: '/'
    });
}); 	