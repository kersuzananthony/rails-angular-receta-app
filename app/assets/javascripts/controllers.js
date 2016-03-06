'use strict';

(function() {

    var controllers = angular.module('controllers', []);

    controllers.controller("RecipesController", [
        "$scope",
        "$routeParams",
        "$location",
        "Recipe",
        "flash",
        "$http",
        function($scope, $routeParams, $location, Recipe, flash, $http) {

            $scope.search = function(keywords) {
                $location.path("/").search('keywords',keywords);
            };

            if ($routeParams.keywords) {
                Recipe.query({
                    keywords: $routeParams.keywords
                }, function(results) {
                    $scope.recipes = results;
                }, function(error) {
                    flash.error = "There is no recipe with ID " + $routeParams.keywords;
                });
            } else {
                Recipe.query({}, function(result) {
                   $scope.recipes = result;
                });
            }

            $scope.view = function(recipeId) {
                $location.path("/recipes/" + recipeId);
            };

            $scope.newRecipe = function() {
                $location.path('/recipes/new');
            };

            $scope.edit = function(recipeId) {
                $location.path('/recipes/' + parseInt(recipeId) + '/edit');
            };

        }]);

    controllers.controller('RecipeController', [
        "$scope",
        "$routeParams",
        "$location",
        "Recipe",
        "flash",
        function($scope, $routeParams, $location, Recipe, flash) {

            if ($routeParams.recipeId) {
                Recipe.get({
                    recipeId: $routeParams.recipeId
                }, function(recipe) {
                    $scope.recipe = recipe;
                }, function(error) {
                    $scope.recipe = null;
                    flash.error = "There is no recipe with ID " + $routeParams.recipeId;
                });
            } else {
                $scope.recipe = {};
            }

            $scope.back = function() {
                $location.path("/");
            };

            $scope.edit = function() {
                $location.path("/recipes/" + $scope.recipe.id + "/edit")
            };

            $scope.cancel = function() {
                if ($scope.recipe.id) {
                    $location.path("/recipes/" + $scope.recipe.id);
                } else {
                    $location.path("/");
                }
            };

            $scope.save = function() {
                var onError = function() {
                    flash.error = "Something went wrong";
                };

                if ($scope.recipe.id) {
                    $scope.recipe.$save(function(success) {
                       $location.path("/recipes/" + $scope.recipe.id);
                    }, onError());
                } else {
                    Recipe.create($scope.recipe, function(newRecipe) {
                       $location.path("/recipes/" + newRecipe.id)
                    }, onError());
                }
            };

            $scope.delete = function() {
                $scope.recipe.$delete();
                $scope.back();
            };
        }
    ]);

})();