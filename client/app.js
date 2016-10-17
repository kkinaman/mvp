angular.module('travelPlannerApp', [
  'travelPlannerApp.search',
  'ngRoute'
  ])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'searchPage/searchPage.html',
      controller: 'SearchPageController'
    });
});
