
angular.module('fargo')

  .controller('UserIndexCtrl', function($scope, User, users) {

    $scope.users = users;
  });
