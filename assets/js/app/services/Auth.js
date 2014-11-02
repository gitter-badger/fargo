
angular.module('fargo')

  .factory('Auth', function($window, $cookies, restmod) {

    var model  = restmod.model('/sessions'),
        config = $window.common.authorisation,
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
        return config.checkAccess(role, permission);
      },

      login: function(username, password) {
        return model.$create({
          username: username,
          password: password
        }).$then(function(user) {
          Auth.user = user;
          return user;
        });
      },

      logout: function() {
        return model.$destroy().$then(function() {
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
