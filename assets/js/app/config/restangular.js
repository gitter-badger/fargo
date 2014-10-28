'use strict';

angular.module('fargo')

  .config(function(RestangularProvider, config) {

    RestangularProvider.setBaseUrl(config.API_PATH);
  });
