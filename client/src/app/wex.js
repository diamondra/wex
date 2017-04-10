var app = angular.module("wexApp", 
[
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngRoute',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'ui.select', 
  'ngSanitize',
  
  'BlurAdmin.theme',
  'wexApp.settings',
  'wexApp.dashboard',
  'wexApp.settings',
  'wexApp.todo',
  'wexApp.user',
  'wexApp.crm',
  'wexApp.production'
]);

app.run(routeAuthChecker);

function routeAuthChecker($rootScope, $route, $location, Auth) 
{
    $rootScope.$on('$routeChangeStart', function(event, next) 
    {   
        //Si l'utilisateur n'est pas loggé, on récupère ses infos depuis le serveur
        if (Auth.isLogged() === false)
        {
            event.preventDefault();
            return Auth.checkServer(
            function()
            {
                $route.reload();
            },
            function(){});
        }
        // On vérifie que l'utilisateur possède bien les droits pour accéder 
        // à la route, et si ce n'est pas le cas on redirigie vers l'accueil
        if (typeof next.$$route.role !== 'undefined') 
        {
            var role = next.$$route.role;
            if (!Auth.hasRole(role))
            {
                $location.path('/');
            }
        }
    });
}