app.factory('Assignment', ['Entity', function(Entity) 
{ 
    var provider = {};
    angular.copy(Entity, provider);
    
    provider.setPath('/rest/assignment');
    return provider;
}]);
