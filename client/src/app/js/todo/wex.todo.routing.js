appTodo.config(function($routeProvider,$locationProvider, WEX_CONFIG)
{
	var roles = WEX_CONFIG().ROLES;
	$locationProvider.hashPrefix('');
    $routeProvider
	.when('/todo', {
        controller: 'TodoListCtrl',
        templateUrl: '/app/js/todo/views/todo-list.html',
		title: 'Tâches'
    })
	.when('/todo/create', {
        controller: 'TodoCreateCtrl',
        templateUrl: '/app/js/todo/views/todo-edit.html',
		title: 'Créer une tâche'
    })
});