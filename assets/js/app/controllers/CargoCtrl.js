
angular.module('fargo')

  .controller('CargoCtrl', function ($scope, Client, Commodity) {

    $scope.cargo = {};
    $scope.types = [
      'PALLET',
      'CARTON',
      'UNIT',
      'PACKAGE',
      'CASE',
      'DRUM',
      'BOX'
    ];

    $scope.lookupCommodities = function(term) {
      return Commodity.$searchByTerm(term).$asPromise();
    };

    $scope.lookupProducers = function(term) {
      return Client.$searchByTerm(term, 'producer').$asPromise();
    };

    $scope.submit = function() {
      $scope.booking.cargos.$create($scope.cargo).$then(function() {
        $scope.cargo = {};
      });
    };
  });
