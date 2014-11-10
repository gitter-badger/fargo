
angular.module('fargo')

  .controller('ContainersCtrl', function ($scope, ContainerType) {

    $scope.container = $scope.booking.containers.$build();

    $scope.lookupTypes = function(term) {
      return ContainerType.$searchByTerm(term).$asPromise();
    };

    $scope.mount = function(item) {
      $scope.container = item;
    };

    $scope.container = {};
    $scope.containerTypes = containerTypes;

    $scope.addContainer = function() {
      $scope.containers.push($scope.container);
      $scope.toggleAddContainer();
    };

    $scope.toggleAddContainer = function() {
      $scope.showContainer = !$scope.showContainer;
      $scope.container = {};
    };

    $scope.submit = function() {
      $scope.container.$save().$asPromise().then(function() {
        $scope.container = $scope.booking.containers.$build();
      });
    };

    $scope.destroy = function(container) {
      var index = $scope.containers.indexOf(container);
      $scope.containers.splice(index, 1);
    };
  });
