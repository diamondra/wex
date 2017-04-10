app.factory('Role', ['Entity', function(Entity) 
{ 
    var provider = {};
    angular.copy(Entity, provider);
    
    provider.setPath('/rest/role');
    return provider;
}]);
