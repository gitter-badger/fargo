
angular.module('fargo')

  .factory('ContainerType', function(restmod) {

    return restmod.model('/containertypes').mix({
      $extend: {
        Model: {
          $searchByTerm: function (term) {
            return this.$search({
              where: {
                description: {contains: term}
              }
            });
          }
        }
      }
    });
  });
