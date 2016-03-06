'use strict';

(function(angular) {

    var services = angular.module('services', []);

    services.factory('Recipe', ['$resource', function($resource) {
        return $resource('/recipes/:recipeId', {
            recipeId: "@id", format: 'json'
        }, {
            'save':   {method:'PUT'},
            'create': {method:'POST'}
        });
    }]);

})(window.angular);