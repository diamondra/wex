app.factory('ActivityReport', ['Entity', function(Entity) 
{ 
    var provider = {};
    angular.copy(Entity, provider);
    
    provider.setPath('/rest/activityreport');
    return provider;
}]);
