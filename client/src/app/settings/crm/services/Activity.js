app.factory('Activity', ['Entity', function(Entity) 
{ 
    var provider = {};
    angular.copy(Entity, provider);
    
    provider.setPath('/rest/activity');
    return provider;
}]);
