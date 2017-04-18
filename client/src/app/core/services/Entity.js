/*
 * Service REST qui permet d'effectuer des operations sur les entités de l'application
 * Le service doit être étendu par une autre factory angular en utilisant la méthode setPath pour indiquer l'url associée à l'entité du c$oté de symfony
 * Par exemple :
 * app.factory('EntityName', ['Entity', function(Entity) 
 * { 
 *     var provider = {};
 *     angular.copy(Entity, provider);
 *   
 *     provider.setPath('/memo/rest/noteinternes');
 *     return provider;
 * }]);
 */
app.factory('Entity', ['$http', function($http) 
{ 
    this.path = '';
    this.cacheId = null;
    this.cachePromise = null;
    
    //Paramètres à passer à $http pour envoyer un objet FormData() plutôt que du JSON
    var formDataParams =    {
                                transformRequest:   function(data)
                                                    {
                                                        var formData = new FormData();
                                                        toFormData(data, formData, '');
                                                        return formData;
                                                    },
                                headers: {'Content-Type': undefined}
                            };
    
    //Fonction récursive qui convertit un objet multi-dimensionnel n en objet FormData uni-dimensionnel
    //L'architecture du tableau est conservée dans les clés du FormData(), 
    //qui sont de type "objet1[objet2][objet3][tableau][]".
    //Attends en paramètres un objet n, un objet FormData() formData et une
    //string key (qui sera vide sauf si on veut ajouter un texte au début de chaque
    //clé du FormData().
    var toFormData = function (n, formData, key)
    {
		
        if (typeof n !== 'undefined' && n !== null && typeof n === 'object')
        {
            //Si n est un objet File, on le place dans le FormData()
            if (n.constructor.name === 'File')
            {
                formData.append(key, n);
                return;
            }
            //Si n est un objet d'un autre type, on appelle toFormData sur chacune de ses entrées,
            //en lui passant une string key mise à jour.
            for (var i in n)
            {
                if (typeof key === 'undefined' || key === null || key === '')
                {
                    var newKey = i;
                }
                else if (Array.isArray(n))
                {
                    //var newKey = key + '[]';
                }
                else
                {
                    //var newKey = key + '['+ i + ']';
					var newKey = i;
                }
                toFormData(n[i], formData, newKey);
            }
        }
        else
        {
            //Si n n'est pas un objet, on le place dans le FormData() en filtrant les valeurs nulles
            if (typeof n === 'undefined' || n === null)
            {
                n = '';
            }
            formData.append(key, n);
        }
    };  
    
    return{
            setPath:    function(string)
                        {
                            this.path = string;
                        },
            getPath:    function(string)
                        {
                            return this.path;
                        },
            getFormDataParams:  function(string)
                                {
                                    return formDataParams;
                                },
            /*
             * Fonction de récupération de listes
             * @param array filters : array de filtres
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */
            getList:    function(filters, success, error)
                        {
                            var params = {};
                            for (var key in filters)
                            {
                                if (filters[key] !== null)
                                {
                                    params[key] = filters[key].toString();
                                }
                            }
                            $http.get(this.path, {params : params})
                            .then(function(response) 
                            {
                                success(response.data);
                            }, 
                            function(response) 
                            {
                                error('Erreur lors de la récupération de la liste des objets.');
                            });
                        },
            /*
             * Fonction de récupération d'une liste de filtre (pour la directive mzSelectize)
             * @param array filters : array de filtres
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */
            getFilterList:  function(type, success, error)
                            {
                                var url = type === null ? '/filter' : '/'+type+'/filter';
                                $http.get(this.path+url)
                                .then(function(response) 
                                {
                                    success(response.data);
                                }, 
                                function(response) 
                                {
                                    error('Erreur lors de la récupération des filtres');
                                });
                            },
            /*
             * Fonction de récupération d'une entité
             * @param int id : id de l'entité
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */
            get:        function(id, success, error)
                        {
                            $http.get(this.path+'/'+id)
                            .then(function(response) 
                            {
                                success(response.data);
                            }, 
                            function(response) 
                            {
                                error('Erreur lors de la récupération de l\'objet');
                            });
                        },
            /*
             * Fonction qui récupère une entité et a mete en cache
             * @param int id : id de l'entité
             */
            getCache: function(id)
            {
                id = parseInt(id);
                if (id === this.cacheId && this.cachePromise) 
                {
                    return this.cachePromise;
                }
                this.cacheId = id;
                this.cachePromise = $http.get(this.path+'/'+id);
                return this.cachePromise;
            },
            /*
             * Vide le cache de l'entité
             */
            resetCache: function()
            {
                this.cacheId = null;
                this.cachePromise = null;
            },
            /*
             * Fonction qui récupère une entité et a mete en cache
             * @param int id : id de l'entité (vide si l'on veut le formulaire de création)
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */
            getForm:    function(id, success, error)
                        {
                            var string = id === null ?'/form.html' : '/'+id+'/form.html';
                            $http.get(this.path+string)
                            .then(function(response) 
                            {
                                success(response.data);
                            }, 
                            function(response) 
                            {
                                error('Erreur lors de la récupération du formulaire');
                            });
                        },
            /*
             * Fonction qui post une entité
             * @param object data : l'objet à poster, issu du modele du formulaire
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */
            post:       function(data, success, error)
                        {
                            $http.post(this.path, data, formDataParams)
                            .then(function(response) 
                            {
                                success(response.data);
                            }, 
                            function(response) 
                            {
                                error('Erreur lors de la soumission du formulaire (création)');
                            });
                        },
            /*
             * Fonction qui put (met à jour) une entité
             * @param it id : l'id de l'objet
             * @param object data : l'objet à mettre jour, issu du modele du formulaire
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */          
            put :       function(id, data, success, error)
                        {
                            $http.put(this.path+'/'+id, data, formDataParams)
                            .then(function(response) 
                            {
                                success(response.data);
                            }, 
                            function(response) 
                            {
                                error('Erreur lors de la soumission du formulaire (mise à jour)');
                            });
                        },
            /*
             * Fonction qui patch (met à jour un ou plusieurs champs) une enté
             * @param it id : l'id de l'objet
             * @param object data : les données à translettre
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */   
            patch:      function(id, data, success, error)
                        {
                            $http.patch(this.path+'/'+id, data)
                            .then(function(response) 
                            {
                                success(response.data);
                            }, 
                            function(response) 
                            {
                                error('Erreur lors de la soumission du formulaire (modification)');
                            });
                        },
            /*
             * Fonction qui supprime une entité
            *  @param it id : l'id de l'objet
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */ 
            delete :    function(id, success, error)
                        {
							/*
                            var key = null;
                            for (var i = 0; i <= array.length ; i++)
                            {
                                if (array[i].id === id)
                                {
                                    key = i;
                                    break;
                                }
                            }
                            if (key === null)
                            {
                                return false;
                            }
							*/
                            $http.delete(this.path+'/'+id)
                            .then(function(response) 
                            {
                                /*array.splice(key, 1);*/
                                success(response.data);
                            }, 
                            function(response) 
                            {
                                error('Erreur lors de la suppresion de l\'objet');
                            });
                        },
            /*
             * Fonction de recherche
             * @param string value : valeur à rechercher
             * @param array params : parametres supplémentaires
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */ 
            search :    function(value, params, success, error)
                        {
                            $http.get(this.path+'/search/'+value, { params : params })
                            .then(function(response) 
                            {
                                success(response.data);
                            },
                            function(response) 
                            {
                                error('Erreur lors de la recherche');
                            });
                        },
            /*
             * FFonction de recherche de doublons
             * @param string attr : champ de l'entité à examiner
             * @param string contnet : contenu à rechercher
             * @param success : callback appelée en cas de succès
             * @param error : callback appelée en cas d'erreur
             */ 
            findDuplicates :    function(attr, content, success, error)
                                {
                                    var path = this.path+'/duplicates/'+attr;
                                    var params = {content : content};
                                    $http.get(path, {params : params})
                                    .then(function(response) 
                                    {
                                        success(response.data);
                                    }, 
                                    function(response) 
                                    {
                                        error('Erreur lors de la recherche de doublons');
                                    });
                                }
    };
}]);
