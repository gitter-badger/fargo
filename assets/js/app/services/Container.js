

angular.module('fargo')

  .factory('Container', function(restmod) {

    return restmod.model('/containers');
  });
