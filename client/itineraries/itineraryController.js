angular.module('travelPlannerApp.itinerary', [])

.controller('ItineraryController', function($scope) {
  $scope.destination = "{{destination}}";
  $scope.listItems = [];
  $scope.addItem = function() {
    $scope.listItems.unshift($scope.itineraryItem);
    $scope.itineraryItem = '';
  };
  
});