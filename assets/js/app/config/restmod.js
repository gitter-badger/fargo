
angular.module('fargo')

  .config(function(restmodProvider) {
    restmodProvider.rebase({
      $config: {
        urlPrefix: '/api/v1'
      }
    });
  });
