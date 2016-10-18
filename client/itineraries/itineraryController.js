angular.module('travelPlannerApp.itinerary', [])

.controller('ItineraryController', function($scope, $http, newDestinationFactory) {

  $scope.destination = newDestinationFactory.getDest();

  $scope.listItems = [];

  var fetchTodos = function() {
    console.log('LOOKING fOR', $scope.destination);
    $http({
      method: 'GET',
      url: '/destination',
      params: {dest: $scope.destination}
    }).then(function(resp) {
      console.log('GET RESPONSE', resp);
      $scope.listItems = resp.data.todos.map(function(todo) {
        return todo.text;
      });
    });
  }

  fetchTodos();

  $scope.addItem = function() {
    // $scope.listItems.unshift($scope.itineraryItem);

    var newTodo = {
      text: $scope.itineraryItem,
      dest: $scope.destination
    };

    $http({
      method: 'POST',
      url: '/destination/todo',
      data: newTodo
    }).then(function(resp) {
      fetchTodos();
      return resp;
    });

    $scope.itineraryItem = '';
  };
  
});