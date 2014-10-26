
angular.module('fargo')

  .factory('Auth', function(Restangular, $window, $cookies) {

    var route  = Restangular.all('sessions'),
        config = $window.authorisation,
        Auth   = {},
        user;

    if($cookies['SESSION-USER']) {
      user = JSON.parse($cookies['SESSION-USER']);
      delete $cookies['SESSION-USER'];
    }

    Auth = {
      user:      user,
      roles:     config.roles,
      userRoles: config.userRoles,

      authorize: function(permission) {
        var role = Auth.user && Auth.user.role;
        return $window.authorisation.checkAccess(role, permission);
      },

      login: function(username, password) {
        return route.post({
          username: username,
          password: password
        }).then(function(user) {
          Auth.user = user;
          return user;
        });
      },

      logout: function() {
        return route.remove().then(function() {
          delete Auth.user;
        });
      }
    };

    Object.defineProperty(Auth, 'isAuthenticated', {
      get: function() {
        return !!Auth.user;
      }
    });

    return Auth;
  });
