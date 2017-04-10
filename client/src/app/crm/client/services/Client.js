app.factory('Client', ['Entity', function(Entity) 
{ 
    var provider = {};
    angular.copy(Entity, provider);
    
    provider.setPath('/rest/client');
    return provider;
}]);
