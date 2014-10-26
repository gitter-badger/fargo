

angular.module('fargo')

  .factory('User', function(Restangular) {

    return Restangular.service('users');
  });

