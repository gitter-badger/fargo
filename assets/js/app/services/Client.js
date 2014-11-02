
angular.module('fargo')

  .factory('Client', function(restmod) {

    return restmod.model('/clients').mix({
      $extend: {
        Model: {
          $searchByTerm: function (term, roles) {
            roles = [].concat(roles || []);
            var options = {
              where: {
                name: {contains: term}
              },
              sort: 'name'
            };
            if(roles.length) {
              options.where.role = roles;
            }
            return this.$search(options);
          }
        }
      }
    });
  });
