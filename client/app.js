angular.module('travelPlannerApp', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'SearchPageController'
    });
})
.controller('SearchPageController', function($scope) {
  $scope.setDestination = function() {
    console.log($scope.destination);
  }
});