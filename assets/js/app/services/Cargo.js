
angular.module('fargo')

  .factory('Cargo', function(restmod) {

    return restmod.model('/cargos');
  });
