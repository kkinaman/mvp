angular.module('travelPlannerApp', [
  'travelPlannerApp.search',
  'travelPlannerApp.itinerary',
  'ngRoute'
  ])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'searchPage/searchPage.html',
      controller: 'SearchPageController'
    })
    .when('/destination', {
      templateUrl: 'itineraries/itinerary.html',
      controller: 'ItineraryController'
    });
})

.factory('newDestinationFactory', function() {
  var destination = '';
  return {
    getDest: function() {
      return destination;
    },
    setDest: function(dest) {
      destination = dest;
    }
  }
});
