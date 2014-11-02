
angular.module('fargo')

  .factory('Commodity', function(restmod) {

    return restmod.model('/commodities').mix({
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
