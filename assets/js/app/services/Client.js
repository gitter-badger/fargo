

angular.module('fargo')

  .factory('Client', function(Restangular) {

    var Client = Restangular.all('clients');

    Client.findByTerm = function(term) {
      return this.getList({
        where: {
          name: {contains: term}
        }
      }).then(function(items) {
        return items.map(function(item) {
          return item.plain();
        });
      });
    };

    return Client;
  });
