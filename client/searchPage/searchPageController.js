angular.module('travelPlannerApp.search', [])

.controller('SearchPageController', function($scope, newDestinationFactory) {
  $scope.setDestination = function() {
    console.log($scope.destination);
    newDestinationFactory.setDest($scope.destination);
  }
});