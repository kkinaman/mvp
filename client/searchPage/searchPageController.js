angular.module('travelPlannerApp.search', [])

.controller('SearchPageController', function($scope, newDestinationFactory) {

  // function prettifyText(string) {
  //   return string.split(' ').map(function(word) {
  //     return  _.capitalize(word);
  //   }).join(' ');
  // };

  $scope.setDestination = function() {
    console.log($scope.destination);
    newDestinationFactory.setDest($scope.destination);
    // newDestinationFactory.setDest(prettifyText($scope.destination));
  }
});