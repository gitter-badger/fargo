
angular.module('fargo')

  .controller('ErrorController', function($scope, $state) {

    $scope.status  = $state.params.status;
    $scope.message = $state.params.message;
  });
