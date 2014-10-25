
angular.module('fargo')

  .controller('UserIndexController', function($scope, users, User) {

    $scope.users = users;
  });
