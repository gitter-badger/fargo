
angular.module('fargo')

  .controller('TransferController', function ($scope, Client, Transfer) {

    $scope.transfer = {
      cargos: []
    };

    $scope.toggleSelected = function(item) {
      var items = $scope.transfer.cargos,
          index = items.indexOf(item);
      index > -1 ? items.splice(index, 1) : items.push(item);
    };

    $scope.lookupTruckers = function(term) {
      return Client.$searchByTerm(term, 'trucking').$asPromise();
    };

    $scope.submit = function() {
      $scope.booking.transfers.$create($scope.transfer).$asPromise().then(function() {
        $scope.transfer = {
          cargos: []
        };
      });
    };
  });
