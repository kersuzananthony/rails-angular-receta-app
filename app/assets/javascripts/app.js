'use strict';

(function (angular) {

    var receta = angular.module('receta', [
        'controllers',
        'services',
        'templates',
        'ngRoute',
        'ngResource',
        'angular-flash.service',
        'angular-flash.flash-alert-directive'
    ]);

    receta.config(['$controllerProvider', function($controllerProvider) {
        $controllerProvider.allowGlobals();
    }]);

    receta.config([
        '$routeProvider',
        'flashProvider',
        function ($routeProvider, flashProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: "index.html",
                    controller: "RecipesController"
                })

                .when('/recipes/new', {
                    templateUrl: "form.html",
                    controller: "RecipeController"
                })

                .when('/recipes/:recipeId', {
                    templateUrl: "show.html",
                    controller: "RecipeController"
                })

                .when("/recipes/:recipeId/edit", {
                    templateUrl: "form.html",
                    controller: "RecipeController"
                });
        }]);

    var services = angular.module('services', []);

    var controllers = angular.module('controllers', []);

})(window.angular);