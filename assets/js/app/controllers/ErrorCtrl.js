
angular.module('fargo')

  .controller('ErrorCtrl', function($scope, $state) {

    $scope.status  = $state.params.status;
    $scope.message = $state.params.message;
  });
