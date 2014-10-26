
angular.module('fargo')

  .controller('UserIndexController', function($scope, socket) {

    socket.get('/api/users', function(users) {
      $scope.users = users;
    });
  });
