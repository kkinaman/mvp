angular.module('travelPlannerApp.search', [])

.controller('SearchPageController', function($scope, $http, newDestinationFactory) {

  

  $scope.setDestination = function() {
// TODO: fill the creator field in
    var newDestination = {
      // creator: 'user',
      name: newDestinationFactory.capitalizeWords($scope.destination)
    };
    $http({
      method: 'POST',
      url: '/destination',
      data: newDestination
    }).then(function(resp) {
      return resp;
    });
  }
});