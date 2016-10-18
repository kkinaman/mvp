angular.module('travelPlannerApp.search', [])

.controller('SearchPageController', function($scope, $http, newDestinationFactory) {

  var capitalizeWords= function(string) {
    if (string.split(' ')) {
      return string.split(' ').map(function(word) {
          var chars = word.toLowerCase().split('');
          chars[0] = chars[0].toUpperCase();
          return chars.join('');
        }).join(' ');
    }
  };

  $scope.setDestination = function() {
    // newDestinationFactory.setDest(capitalizeWords($scope.destination));
// TODO: fill the creator field in
    var newDestination = {
      // creator: 'user',
      name: newDestinationFactory.getDest()
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