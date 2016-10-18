angular.module('travelPlannerApp.places', [])

.controller('PlacesController', function($scope, $http) {
  $scope.places = [];
  $http({
    method: 'GET',
    url: '/places'
  }).then(function(resp) {
    console.log(resp.data);
    $scope.places = resp.data;
  });
});