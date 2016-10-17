angular.module('travelPlannerApp.search', [])

.controller('SearchPageController', function($scope) {
  $scope.setDestination = function() {
    console.log($scope.destination);
  }
});