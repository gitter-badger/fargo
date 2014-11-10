

angular.module('fargo')

  .factory('Truck', function(restmod) {

    return restmod.model('/trucks');
  });
