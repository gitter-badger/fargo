
angular.module('fargo')

  .factory('Location', function(restmod) {

    return restmod.model('/locations').mix({
      $extend: {
        Model: {
          $searchByTerm: function (term) {
            return this.$search({
              where: {
                or: [
                  {name:   {contains: term}},
                  {locode: {contains: term}}
                ]
              },
              sort: 'locode'
            });
          }
        }
      }
    });
  });
