
angular.module('fargo')

  .controller('ContainerController', function ($scope, ContainerType) {

    $scope.container = {};

    $scope.lookupTypes = function(term) {
      return ContainerType.$searchByTerm(term).$asPromise();
    };

    $scope.submit = function() {
      $scope.booking.containers.$create($scope.container).$asPromise().then(function() {
        $scope.container = {};
      });
    };
  });
