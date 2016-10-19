angular.module('travelPlannerApp.itinerary', [])

.controller('ItineraryController', function($scope, $http, $window, newDestinationFactory, $routeParams) {

  newDestinationFactory.setDest(newDestinationFactory.capitalizeWords($routeParams.dest));
  $scope.destination = newDestinationFactory.getDest();

  $scope.listItems = [];
  $scope.images = [];
  $scope.featuredImage = '';

  var fetchTodos = function() {
    $http({
      method: 'GET',
      url: '/destination',
      params: {dest: $scope.destination}
    }).then(function(resp) {
      $scope.listItems = resp.data.todos;
    });
  }


  var fetchImages = function() {
    $http({
      method: 'GET',
      url: '/destination/images',
      params: {
        dest: $scope.destination,
        query: 'landscape'
      }
    }).then(function(resp) {
      $scope.images = resp.data.map(function(image) {
        return image.display_sizes[0].uri;
      });
      $scope.featuredImage = $scope.images[0];
      $('.itineraryJumbotron').css('background-image', 'url(' + $scope.featuredImage + ')');
      updateDestPhoto($scope.destination, $scope.images[0]);
    });
  };

  var updateDestPhoto = function(destination, imageUrl) {
    $http({
      method: 'POST',
      url: '/destination/photo',
      data: {
        dest: destination,
        imageUrl: imageUrl
      }
    }).then(function(resp) {
      return resp;
    })
  };

  fetchTodos();
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
      url: '/destination/images',
      params: {
        dest: $scope.destination,
        query: $scope.imagesQuery
      }
    }).then(function(resp) {
      $scope.images = resp.data.map(function(image) {
        return image.display_sizes[0].uri;
      })
    });
  }

  $scope.addImageItem = function(photoUrl) {
    var comment = $window.prompt('Add comment to photo: ');
    var newImageTodo = {
      //TODO: allow user to add comment
      text: comment,
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
    var confirmed = $window.confirm('Delete?');
    if (confirmed) {
      $http({
        method: 'POST',
        url: '/destination/todo/remove',
        data: item
      }).then(function(resp) {
        fetchTodos();
        return resp;
      });
    }
  }
  
});