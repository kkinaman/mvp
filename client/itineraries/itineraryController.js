angular.module('travelPlannerApp.itinerary', [])

.controller('ItineraryController', function($scope, newDestinationFactory) {
  $scope.destination = newDestinationFactory.getDest();
  $scope.listItems = [];
  $scope.addItem = function() {
    $scope.listItems.unshift($scope.itineraryItem);
    $scope.itineraryItem = '';
  };
  
});