
angular.module('fargo')

  .config(function($locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get('$state');
      $state.go('error', {status: 404}, {location: false});
    });

    $locationProvider.html5Mode(true);
  })

  .config(function($stateProvider) {

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard.html',
        data: {
          permission: 'user'
        }
      });

    $stateProvider
      .state('users', {
        url: '/users',
        controller: 'UserIndexController',
        templateUrl: 'users/index.html',
        data: {
          permission: 'admin'
        },
        resolve: {
          users: function(User) {
            return User.getList();
          }
        }
      });

    $stateProvider

      .state('error', {
        params: {
          status:  '',
          message: ''
        },
        controller: 'ErrorController',
        templateUrl: 'error.html',
        data: {
          permission: 'public'
        }
      })
  });
