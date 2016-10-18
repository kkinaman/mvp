angular.module('travelPlannerApp.search', [])

.controller('SearchPageController', function($scope, $http, newDestinationFactory) {

  // function prettifyText(string) {
  //   return string.split(' ').map(function(word) {
  //     return  _.capitalize(word);
  //   }).join(' ');
  // };

  $scope.setDestination = function() {
    newDestinationFactory.setDest($scope.destination);

// TODO: fill these fields in
    var newDestination = {
      // creator: 'user',
      name: $scope.destination
      // todos: []
    };
    $http({
      method: 'POST',
      url: '/destination',
      data: newDestination
    }).then(function(resp) {
      return resp;
    });
    // newDestinationFactory.setDest(prettifyText($scope.destination));
  }
});