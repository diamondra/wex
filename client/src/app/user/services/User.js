app.factory('User', ['Entity', '$http', function(Entity, $http) 
{ 
    var provider = {};
	provider.userPromise = null;
    angular.copy(Entity, provider);
    
    provider.setPath('/rest/user');
    provider.getCurrent = function(success, error)
    {
        if (provider.userPromise) 
        {
            return provider.userPromise;
        }
        else
        {
            provider.userPromise = $http.get(provider.getPath()+'/current');
            return provider.userPromise;
        }
    };	
    return provider;
}]);
