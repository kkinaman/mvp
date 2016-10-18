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
    .when('/destination/:dest', {
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
    },
    capitalizeWords: function(string) {
      if (string.split(' ')) {
        return string.split(' ').map(function(word) {
            var chars = word.toLowerCase().split('');
            chars[0] = chars[0].toUpperCase();
            return chars.join('');
          }).join(' ');
      }
    }
  }
});


  