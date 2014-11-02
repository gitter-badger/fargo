
angular.module('fargo')

  .config(function($httpProvider) {

    $httpProvider.interceptors.push(function ($q, $injector) {
      return {
        responseError: function (response) {
          var $state = $injector.get('$state');

          if(response.status === 400) {
            console.log(response.data);
          }

          $state.go('error', {
            status:  response.status,
            message: response.data
          }, {location: false});

          return $q.reject(response);
        }
      };
    });
  });
