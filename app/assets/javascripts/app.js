'use strict';

(function() {

    var receta = angular.module('receta', [
        'controllers',
        'templates',
        'ngRoute'
    ]);

    var recipes = [
        {
            id: 1,
            name: 'Baked Potato w/ Cheese'
        },
        {
            id: 2,
            name: 'Garlic Mashed Potatoes',
        },
        {
            id: 3,
            name: 'Potatoes Au Gratin',
        },
        {
            id: 4,
            name: 'Baked Brussel Sprouts',
        }
    ]; // Hard code recipes for now

    receta.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: "index.html",
            controller: "RecipesController"
        });

    }]);

    var controllers = angular.module('controllers', []);
    controllers.controller("RecipesController", [
        "$scope",
        "$routeParams",
        "$location",
        function($scope, $routeParams, $location) {

            $scope.search = function(keywords) {
                $location.path("/").search('keywords',keywords);
            };

            console.log("Params", $routeParams);

            if ($routeParams.keywords) {
                var keywords = $routeParams.keywords.toLowerCase();
                console.log(keywords);
                $scope.recipes = recipes.filter(function(r) {
                   return r.name.toLowerCase().indexOf(keywords) != -1;
                });
            } else {
                $scope.recipes = [];
            }
    }]);

})();