angular.module('travelPlannerApp.itinerary', [])

.controller('ItineraryController', function($scope, $http, newDestinationFactory) {

  $scope.destination = newDestinationFactory.getDest();

  $scope.listItems = [];
  $scope.featuredPhoto = '';
  $scope.photos = [];

  var fetchTodos = function() {
    $http({
      method: 'GET',
      url: '/destination',
      params: {dest: $scope.destination}
    }).then(function(resp) {
      $scope.listItems = resp.data.todos;
    });
  }

  fetchTodos();

  var fetchImages = function() {
    $http({
      method: 'GET',
      url: '/destination/photos',
      params: {
        dest: $scope.destination,
        query: 'landscape'
      }
    }).then(function(resp) {
      $scope.photos = resp.data.map(function(image) {
        return image.display_sizes[0].uri;
      })
    });
  }

  fetchImages();

  $scope.addItem = function() {
    var newTodo = {
      text: $scope.itineraryItem,
      dest: $scope.destination,
      votes: 0
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

  $scope.checkOffItem = function(index) {
    var selector = '#todoListItem' + index;

    angular.element(document.querySelector( selector )).css('background-color','#666');
    angular.element(document.querySelector( selector )).css('border-color','#666');
  };

  $scope.upvote = function(item) {
    var updatedTodo = {
      id: item._id,
      votes: item.votes + 1
    };
    $http({
      method: 'POST',
      url: '/destination/todo/vote',
      data: updatedTodo
    }).then(function(resp) {
      fetchTodos();
      return resp;
    });
  };

  $scope.submitQuery = function() {
    $http({
      method: 'GET',
      url: '/destination/photos',
      params: {
        dest: $scope.destination,
        query: $scope.imagesQuery
      }
    }).then(function(resp) {
      $scope.photos = resp.data.map(function(image) {
        return image.display_sizes[0].uri;
      })
    });
  }

  $scope.addImageItem = function(photoUrl) {
    var newImageTodo = {
      //TODO: allow user to add comment
      text: '',
      imageUrl: photoUrl,
      votes: 0,
      dest: $scope.destination
    };
    $http({
      method: 'POST',
      url: '/destination/todo/image',
      data: newImageTodo
    }).then(function(resp) {
      fetchTodos();
      return resp;
    });
  }

  $scope.removeItem = function(item) {
    $http({
      method: 'POST',
      url: '/destination/todo/remove',
      data: item
    }).then(function(resp) {
      fetchTodos();
      return resp;
    });
  }
  
});