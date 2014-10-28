
angular.module('fargo')

  .controller('UserIndexController', function($scope, User, users) {

    $scope.users = users;
  });
