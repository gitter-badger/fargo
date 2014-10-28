'use strict';

angular.module('fargo', [
  'fargo.bootstrap',
  'fargo.flash',
  'ngCookies',
  'restangular',
  'ui.bootstrap',
  'ui.router'
])
  .run(function($rootScope, $state, Auth) {

    $rootScope.$on('$stateChangeStart', function (e, toState) {
      // make transition-to state available to state resolves/onEnter
      $state.toState = toState;

      // authorize access
      if (!Auth.authorize(toState.data && toState.data.permission)) {
        e.preventDefault();
        $state.go('error', {status: Auth.user ? 403 : 401}, {location: false});
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {

      if (toState.data) {
        toState.data.title && ($rootScope.title = toState.data.title);
      }
    });
  });
