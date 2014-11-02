
angular.module('fargo')

  .filter('depopulate', function() {
    return function(val) {
      return typeof val === 'object' ? val.id : val;
    };
  });
