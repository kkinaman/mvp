angular.module('travelPlannerApp.itinerary', [])

.controller('ItineraryController', function($scope, $http, newDestinationFactory) {

  $scope.destination = newDestinationFactory.getDest();
  $scope.listItems = [];

  $scope.addItem = function() {
    $scope.listItems.unshift($scope.itineraryItem);

    var newTodo = {
      text: $scope.itineraryItem,
      dest: $scope.destination
    };

    $http({
      method: 'POST',
      url: '/destination/todo',
      data: newTodo
    }).then(function(resp) {
      return resp;
    });

    $scope.itineraryItem = '';
  };
  
});