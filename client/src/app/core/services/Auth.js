/*
 * Service d'authentification
 */

app.factory('Auth', ['$http', 'User', 'WEX_CONFIG', function($http, User, WEX_CONFIG) 
{ 
    //Url pour le service d'auhentification, pour le moment inutilisée
    var authPath = 'rest/TOCHANGES';
    
    //Objet user
    var user = 
    {
        isLogged : false,
        id : null,
        username : null,
        roles : null,
		isProductive : {}
    };
    
    return  {
        roles : WEX_CONFIG().ROLES,
        checkServer : checkServer,
        isLogged : isLogged, 
        hasRole : hasRole,
        getRoles : getRoles,
        getUser : getUser,
		isUserProductive : isUserProductive
    };
    
    //Setter de l'objet user
    function setUser(isLogged, id, username, roles)
    {
        user =  {
                    isLogged : isLogged,
                    id : id,
                    username : username,
                    roles: roles,
                };
    }
    
    /*
     * Interroge le serveur pour récupérer l'utilisateur en cours
     * @param function success : callback appelé en cas de succes
     * @param function error : callback appelé en cas d'erreur
     */
    function checkServer(success, error)
    {
        User.getCurrent()
        .then(function(response)
        {
            var data = response.data;
            setUser(true, data._id, data.username, data.role);
            success(user);
        },
        function(response)
        {
            error(response.data);
        });
    }
    
    // Testesi l'utilisateur est loggé
    function isLogged()
    {
        return user.isLogged;
    }
    
    /*
     * Renvoie si l'utilisateur a un role précis
     * @param mixed role : string role ou arrays de string role
     */
    function hasRole(role)
    {
		if (user.roles === undefined){
			return true;
		}

		//si user.roles n est pas un array
		var userRoles = [];
		if (typeof user.roles === 'string'){
			userRoles.push(user.roles);
		}
		else {
			userRoles = user.roles;
		}
		
        if (typeof role === 'object' && role.constructor === Array)
        {
            for (var i = 0, length = userRoles.length; i < length; i++)
            {
			if (role.indexOf(userRoles[i]) > -1) return true;
            }
        }
        else
        {
            if (userRoles.indexOf(role) > -1) return true;
        }
        return false;
    }
    
    //Renvoie la liste des roles de l'utilisateur
    function getRoles()
    {
       return user.roles;
    }
    
    //Renvoie l'utilisateur
    function getUser()
    {
        return user;
    }
	
	function isUserProductive(role)
	{
		if (!role)
        {
            return true;
        }
		else if (!isLogged())
        {
            return false;
        }
        else
        {
            return (role == WEX_CONFIG().ROLES.ROLE_SITE_MANAGER 
							|| role == WEX_CONFIG().ROLES.ROLE_PROJECT_MANAGER
							|| role == WEX_CONFIG().ROLES.ROLE_DEV);
        }		
	}
}]);
