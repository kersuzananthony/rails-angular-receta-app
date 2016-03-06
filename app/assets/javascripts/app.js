'use strict';

(function() {

    var receta = angular.module('receta', [
        'controllers',
        'templates',
        'ngRoute'
    ]);

    receta.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: "index.html",
            controller: "RecipesController"
        });

    }]);

    var controllers = angular.module('controllers', []);
    controllers.controller("RecipesController", ["$scope", function($scope) {

    }]);

})();