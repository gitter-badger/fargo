

angular.module('fargo')

  .factory('User', function(restmod) {

    return restmod.model('/users').mix({
      $extend: {
        Model: {
          $searchByTerm: function(term) {
            return this.$search({
              where: {
                or: [
                  {firstName: {contains: term}},
                  {lastName:  {contains: term}}
                ]
              },
              sort: 'lastName'
            });
          }
        }
      }
    });
  });

