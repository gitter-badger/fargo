
angular.module('fargo')

  .factory('dataService', function(Restangular) {

    var services = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setDefaultHttpFields({cache: true});
    }).all('services');

    return {
      findPortsByTerm: function (term) {
        return services.customGETLIST('ports', {term: term}).then(function(ports) {
          return ports.map(function(port) {
            return port.plain();
          });
        });
      }
    };
  });
