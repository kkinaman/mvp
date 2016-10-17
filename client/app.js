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
});
