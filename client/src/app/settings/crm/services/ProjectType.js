app.factory('ProjectType', ['Entity', function(Entity) 
{ 
    var provider = {};
    angular.copy(Entity, provider);
    
    provider.setPath('/rest/projecttype');
    return provider;
}]);
