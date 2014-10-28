
angular.module('fargo')

  .config(function($socketProvider) {
    $socketProvider.prefix = '/api/';
  });
